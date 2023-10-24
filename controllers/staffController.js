import * as staffModel from "../models/staffModel.js";
import bcrypt from "bcryptjs";

  
export function showLoginPage(req, res) {
    res.render("staff_login.ejs");
}

export function authUserLogin (req,res) {
    const login_username = req.body.username;
    const login_password = req.body.password;

    staffModel.getStaffByUsername(login_username)
      .then(staff => {
        if (bcrypt.compareSync(login_password, staff.password)) {
          req.session.user = {
            staffID: staff.staff_user_id,
            accessRole: staff.staff_role,
            firstName: staff.firstname
          };

          res.redirect("/product_admin");
        } else {
          res.render("staff_login.ejs", { status: "Login Failed", message: "Invalid password" });
        }
      })
      .catch(error => {
        res.render("staff_login.ejs", { status: "Staff not found", message: "Please enter correct username" });
      });
  }

export function userLogout(req, res){
    req.session.destroy((err) =>{
        if (err){
            console.error(err);
            res.status(500).send('logot failed');
        }else {
            res.redirect("/staff_login");
        }
    })
}

export function showStaffAdminPage(req, res) {
  staffModel.getAllStaff()
      .then((staffs) => {
          res.render("staff_admin.ejs", { 
            staffs, 
            accessRole: req.session.user.accessRole,
            firstName: req.session.user.firstName });
      })
      .catch((error) => {
          console.error(error);
          res.send('Internal Server Error');
      });
}


  
export function addStaffPage(req, res) {
  res.render("add_staff.ejs");
}

export function createStaff(req, res) {
  const newStaff = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      staff_role: req.body.staff_role,
      username: req.body.username,
      password: req.body.password,
  };

   // Hash the password and store it in the newStaff object
  bcrypt.hash(newStaff.password, 10)
  .then((hashedPassword) => {
    newStaff.password = hashedPassword; 
    // proceed to create the staff member
    return staffModel.createStaff(newStaff);
  })
  .then(() => {
    const createdStaffFirstName = req.body.firstname;
    req.session.notification = {
      message: `Staff ( ${createdStaffFirstName} ) was created successfully.`,
      type: 'success',
    };
    res.redirect('/staff_admin');
  })
  .catch((error) => {
    console.error(error);
    req.session.notification = {
      message: 'Error creating the staff member. Please try again.',
      type: 'danger',
    };
    res.redirect('/staff_admin');
  });

}

// Render edit staff page
export function editStaffPage(req, res) {
  const staffId = req.params.id;

  staffModel.getStaffById(staffId)
      .then((staff) => {
          if (!staff) {
              req.session.notification = {
                  message: 'Staff not found.',
                  type: 'danger',
              };
              res.redirect('/staff_admin');
          } else {
              res.render('edit_staff.ejs', { staff });
          }
      });
}

// Update staff information
export function updateStaff(req, res) {
  const staffId = req.params.id;
  const updatedStaff = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    staff_role: req.body.staff_role,
    username: req.body.username,
    password: req.body.password, 
  };

  // Hash the password if it isn't already hashed
  if (!updatedStaff.password.startsWith("$2a")) {
    bcrypt.hash(updatedStaff.password, 10)
      .then((hashedPassword) => {
        updatedStaff.password = hashedPassword; // Update the password here
        return staffModel.updateStaffById(staffId, updatedStaff);
      })
      .then(() => {
        req.session.notification = {
          message: `Staff ( ${updatedStaff.firstname} ) updated successfully.`,
          type: 'success',
        };
        res.redirect('/staff_admin');
      })
      .catch((error) => {
        console.error(error);
        req.session.notification = {
          message: 'Error updating staff information.',
          type: 'danger',
        };
        res.redirect('/staff_admin');
      });
  } else {
    // If the password is already hashed, proceed to update without rehashing
    staffModel.updateStaffById(staffId, updatedStaff)
      .then(() => {
        req.session.notification = {
          message: `Staff ( ${updatedStaff.firstname} ) updated successfully.`,
          type: 'success',
        };
        res.redirect('/staff_admin');
      })
      .catch((error) => {
        console.error(error);
        req.session.notification = {
          message: 'Error updating staff information.',
          type: 'danger',
        };
        res.redirect('/staff_admin');
      });
  }
}


export function deleteStaff(req, res) {
  const staffId = req.params.id;

  staffModel.deleteStaffById(staffId)
      .then(() => {
          req.session.notification = {
            message: `Staff member deleted successfully.`,
              type: 'success',
          };
          res.redirect('/staff_admin');
      })
      .catch((error) => {
          console.error(error);
          req.session.notification = {
              message: 'Error deleting staff account.',
              type: 'danger',
          };
          res.redirect('/staff_admin');
      });
}
