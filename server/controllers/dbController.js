const { DB } = require("../config/db")

DB.query("SELECT * FROM new_table", (err, data) => {
    if (err) throw err;
    console.log(data)
})