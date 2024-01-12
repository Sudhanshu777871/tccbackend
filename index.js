const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config");
require("dotenv").config();
// applying the middleware
app.use(express.json());
app.use(cors());

// CREATING THE LOGIN API #
app.post("/login", (req, res) => {
  if (req.body.admin_Id && req.body.Password) {
    const { admin_Id, Password } = req.body;
    // code for SQL query
    config.query(
      "SELECT * FROM admin WHERE admin_Id = ? AND password = ?",
      [admin_Id, Password],
      (error, results) => {
        if (error) throw error;
        res.send(results);
      }
    );
  } else {
    res.send("Please Enter All The Fields");
  }
});

// CREATING THE API FRO FETCHING THE NUMBER OF CUSTOMER #
app.get("/customer_fetch", (req, res) => {
  config.query(
    "SELECT COUNT(Phone) as customer_no FROM tcc_clients",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING THE NUMBER OF EMPLOYEE #
app.get("/employee_fetch", (req, res) => {
  config.query(
    "SELECT COUNT(Phone) as employee_no FROM tcc_boys",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FOR INSERING THE NOTES DATA # #------------------------------------------------------------------------------
app.post("/notes_data_insert", (req, res) => {
  const { note } = req.body;
  config.query(
    "INSERT INTO notes (note_content) VALUES (?)",
    [note],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING ALL NOTES #
app.get("/all_notes", (req, res) => {
  config.query(
    "SELECT * FROM notes ORDER BY S_No",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO DELETING THE ITEMS #
app.delete("/del_notes", (req, res) => {
  const { id } = req.body;
  config.query(
    "DELETE FROM notes WHERE S_No = ?",
    [id],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// -----------------------------------------------------------------------------

// CREATING THE API FOR INSERING THE EXPENSE DATA #
app.post("/expense_data_insert", (req, res) => {
  const { information, amount } = req.body;
  config.query(
    "INSERT INTO expense (Expense_Information,Amount) VALUES (?,?)",
    [information, amount],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO FETCHING ALL EXPENSES #
app.get("/all_expenses", (req, res) => {
  config.query(
    "SELECT * FROM expense ORDER BY Serial_Number",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FOR FETCHING ALL EMPLOYEE ISSUES #
app.get("/employee_issue", (req, res) => {
  config.query(
    "SELECT * FROM employee_issue ORDER BY S_No",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FOR DELETING THE EMPLOYEE ISSUES #
app.delete("/del_employee_issue", (req, res) => {
  const { id } = req.body;
  config.query(
    "DELETE FROM employee_issue WHERE S_No = ?",
    [id],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FRO DELETING THE ITEMS #
app.delete("/del_item_expense", (req, res) => {
  const { id } = req.body;
  config.query(
    "DELETE FROM expense WHERE Serial_Number = ?",
    [id],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});



// CODE EFO RMAKING THE FUNCTION OF API FOR NEW CUSTOMER #
app.post('/new_customer', (req, res) => {
  if (req.body.name && req.body.carNo && req.body.carName && req.body.price && req.body.address && req.body.phone && req.body.cleanerName && req.body.joingDate) {
    const { name, carNo, carName, price, address, phone, cleanerName, joingDate } = req.body;
    config.query("INSERT INTO tcc_clients (Name,Phone, Address, Car_No, Car_Name, Price, assignedTo, JoinDate) VALUES (?,?, ?, ?, ?, ?, ?, ?)", [name, phone, address, carNo, carName, price, cleanerName, joingDate], (error, result) => {
      if (error) throw error;

      res.send(result);
    })
  }
  else {
    res.send("Please Enter All The Fields...")
  }
})


// CODE FOR MAKING THE FUNCTION OF API FOR NEW EMPLOYEE #
app.post('/new_employee', (req, res) => {
  if (req.body.name && req.body.email && req.body.phone && req.body.address && req.body.addhar && req.body.salary && req.body.password && req.body.joingDate) {
    const { name, email, phone, address, addhar, salary, password, joingDate } = req.body;
    config.query("INSERT INTO tcc_boys (Name,Email,Phone, Address, Addhar_no, Salary, Password, Join_Date) VALUES (?,?, ?, ?, ?, ?, ?, ?)", [name, email, phone, address, addhar, salary, password, joingDate], (error, result) => {
      if (error) throw error;

      res.send(result);
    })
  }
  else {
    res.send("Please Enter All The Fields...")
  }
})


// API FOR MAKING TO SET NEW PASSWORD BY ADMIN #

app.put('/update_password', (req, res) => {
  if (req.body.currentPass && req.body.newPass) {
    const { currentPass, newPass } = req.body;
    const adminId = "sarjan63";
    // running query
    config.query("SELECT password FROM admin WHERE admin_Id = ?", [adminId], async (error, result) => {
      if (error) {
        res.send({ message: "Some Problem Occured" });
      }
      else {
        // code for checking the password
        if (currentPass !== result[0].password) {
          res.send(false)
        }

        else {
          config.query("UPDATE admin SET password = ? WHERE admin_Id = ?", [newPass, adminId], (error) => {
            if (error) throw error
            // seding the result
            res.send(true)
          })
        }
      }
    })
  }
  else {
    res.send({ message: "Please Send Current Password & New Password" });
  }
})


// CREATING THE API FOR FETCHING ALL EMPLOYEE #
app.get("/all_customers", (req, res) => {
  config.query(
    "SELECT * FROM tcc_clients ORDER BY S_No",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// CREATING THE API FOR FETCHING ALL EMPLOYEE #
app.get("/all_employee", (req, res) => {
  config.query(
    "SELECT * FROM tcc_boys ORDER BY S_No",
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

// API FOR SEARCHING THE CUSTOMERS #
app.post('/search_customer', async (req, res) => {
  const { customerData } = req.body;

  // Check if the search term exists and is not an empty string
  if (!customerData || customerData.trim() === '') {
    return res.status(400).send("Please provide a valid search term");
  }

  // Use parameterized queries to prevent SQL injection
  const searchTerm = `%${customerData}%`; // Adding wildcards for partial matching

  // Use async/await to handle asynchronous code more cleanly
  const searchQuery = `SELECT * FROM tcc_clients WHERE Name LIKE ?`;

  // Utilize a try/catch block for better error handling
  try {
    const result = await new Promise((resolve, reject) => {
      config.query(searchQuery, [searchTerm], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    // Check if any results were found
    if (result.length === 0) {
      return res.send(false);
    }

    // Sending the result if no error occurred
    res.send(result);
  } catch (error) {
    res.status(500).send("An error occurred while processing your request");
  }
});

// API FOR SEARCHING THE EMPLOYEES #
app.post('/search_employee', async (req, res) => {
  const { employeeData } = req.body;

  // Check if the search term exists and is not an empty string
  if (!employeeData || employeeData.trim() === '') {
    return res.status(400).send("Please provide a valid search term");
  }

  // Use parameterized queries to prevent SQL injection
  const searchTerm = `%${employeeData}%`; // Adding wildcards for partial matching

  // Use async/await to handle asynchronous code more cleanly
  const searchQuery = `SELECT * FROM tcc_boys WHERE Name LIKE ?`;

  // Utilize a try/catch block for better error handling
  try {
    const result = await new Promise((resolve, reject) => {
      config.query(searchQuery, [searchTerm], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    // Check if any results were found
    if (result.length === 0) {
      return res.send(false);
    }

    // Sending the result if no error occurred
    res.send(result);
  } catch (error) {
    res.status(500).send("An error occurred while processing your request");
  }
});




// API FOR MAKING THE FETCHING OF THE CUSTOMER CHARGE SERVICES #
app.post('/student_fee_show', (req, res) => {
  if (req.body.customerId) {
    const { customerId } = req.body
    config.query("SELECT mo_pay FROM tcc_clients WHERE S_No = ?", [customerId], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)
    })
  }
  else {
    res.send("Please Enter Customer Id")
  }
})

// API FOR MAKING THE FETCHING OF THE EMPLOYEE SALARY #
app.post('/employee_salary', (req, res) => {
  if (req.body.employeeId) {
    const { employeeId } = req.body
    config.query("SELECT mo_salary FROM tcc_boys WHERE S_No = ?", [employeeId], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)
    })
  }
  else {
    res.send("Please Enter Employee Id")
  }
})



// MAING API FOR UPDATING THE CHARGE STATUS #

app.put('/update_charge', (req, res) => {
  if (req.body.chargeStatus && req.body.customerId) {
    const { chargeStatus, customerId} = req.body
    config.query("UPDATE tcc_clients SET 	mo_pay = ? WHERE S_No	 = ?", [chargeStatus, customerId], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)
    })
  }
  else {
    res.send("Please Send The Charge Status And Customer ID")
  }

})

// MAING API FOR UPDATING THE SALARY STATUS #

app.put('/update_salary', (req, res) => {
  if (req.body.salaryStatus && req.body.employeeId) {
    const { salaryStatus, employeeId} = req.body
    config.query("UPDATE tcc_boys SET mo_salary = ? WHERE S_No	 = ?", [salaryStatus, employeeId], (error, result) => {
      if (error) throw error
      // sending the result
      res.send(result)
    })
  }
  else {
    res.send("Please Send The Charge Status And Customer ID")
  }

})
// Listening The App
app.listen(process.env.RUNNING_PORT);
