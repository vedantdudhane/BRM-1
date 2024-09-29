const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();
/*
 *Route: /
 *Method:GET
 *Description:Get all users
 *Access: public
 *Parameters: none
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});
/*
 *Route: /:id
 *Method:GET
 *Description:Get user by id
 *Access: public
 *Parameters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // const id= req.params.id;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  });
});
/*
 *Route: /
 *Method:POST
 *Description:Creating new user
 *Access: public
 *Parameters: none
 */
router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    message: "New User added",
    data: users,
  });
});
/*
 *Route: /:id
 *Method:PUT
 *Description:updating a user by their id
 *Access: public
 *Parameters: id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not Exists",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User updated",
    data: updateUserData,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User doesnt exist",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "User deleted",
    data: users,
  });
});

module.exports = router;
