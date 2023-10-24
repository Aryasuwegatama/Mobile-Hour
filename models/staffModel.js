import { db } from "../database.js";

export function newStaff(
    id,
    firstname,
    lastname,
    staff_role,
    username,
    password,
) {
    return {
        id,
        firstname,
        lastname,
        staff_role,
        username,
        password,
    }
}


export function getAllStaff() {
    return db.query('SELECT * FROM staff_user')
        .then(([queryResult]) => {
            // Map the query results to staff model objects
            return queryResult.map((result) => {
                return newStaff(
                    result.staff_user_id,
                    result.firstname,
                    result.lastname,
                    result.staff_role,
                    result.username,
                    result.password
                );
            });
        });
}


export function getStaffByUsername(username) {
    return db.query(`SELECT * FROM staff_user WHERE username = ?`, [username])
        .then(([queryResult]) => {
            // check that at least 1 match was found
            if (queryResult.length > 0) {
                // get the first matching result
                const result = queryResult[0]

                // convert result into a model object
                return newStaff(
                    result.staff_user_id,
                    result.firstname,
                    result.lastname,
                    result.staff_role,
                    result.username,
                    result.password,
                )
            } else {
                throw new Error("No matching results");
            }

        })
}



// Fetch staff by ID
export function getStaffById(staffId) {
    return db.query('SELECT * FROM staff_user WHERE staff_user_id = ?', [staffId])
        .then(([queryResult]) => {
            if (queryResult.length > 0) {
                const result = queryResult[0];
                return newStaff(
                    result.staff_user_id,
                    result.firstname,
                    result.lastname,
                    result.staff_role,
                    result.username,
                    result.password
                );
            } else {
                return null;
            }
        });
}


// Function to update staff member by ID
export function updateStaffById(staffId, staff) {
    return db.query(
      `UPDATE staff_user SET
          firstname = ?,
          lastname = ?,
          staff_role = ?,
          username = ?,
          password = ?
        WHERE staff_user_id = ?`,
      [
        staff.firstname,
        staff.lastname,
        staff.staff_role,
        staff.username,
        staff.password,
        staffId
      ]
    );
  }

// Function to insert a new staff member
export function createStaff(staff) {
    return db.query(
        `INSERT INTO staff_user (
            firstname, 
            lastname, 
            staff_role, 
            username, 
            password) 
        VALUES (?, ?, ?, ?, ?)`,
        [
            staff.firstname, 
            staff.lastname, 
            staff.staff_role, 
            staff.username, 
            staff.password]
    );
}



export function deleteStaffById(staffId) {
    return db.query(`DELETE FROM staff_user WHERE staff_user_id = ?`, [staffId]);
}
