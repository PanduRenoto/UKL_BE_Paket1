const express = require(`express`)
const app = express()
let { validateUser } = require(`../middlewares/user-validation`)
app.use(express.json())
const userController = require(`../controllers/user.controller`)
const { authorize } = require("../controllers/auth.controller")
app.post("/", [validateUser], [authorize], userController.addUser)
app.put("/:id", [authorize], userController.updateUser)
app.get("/:id", [authorize], userController.getUserById)
app.delete("/:id", [authorize], userController.deleteUser)
module.exports = app
