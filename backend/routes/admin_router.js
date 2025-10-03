const adminRouter = require("express").Router()
// Imports Middlewares
const setAditionalInfo = require("../middleware/setAditionalInfo")
const authCheak = require("../middleware/authCheak.js")

// imports Controlars
const { Login } = require("../controlars/admin_controlar.js")

                      // ROUTES //
// Login 
adminRouter.post("/login",Login)


// Exports
module.exports = adminRouter