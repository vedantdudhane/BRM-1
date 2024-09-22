const express = require("express");
const { users } = require("./data/users.json");
const app = express();
const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

/*
 *Route: /users
 *Method:GET
 *Description:Get all users
 *Access: public
 *Parameters: none
 */
app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});
/*
 *Route: /users/:id
 *Method:GET
 *Description:Get user by id
 *Access: public
 *Parameters: id
 */
app.get("/users/:id", (req, res) => {
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
 *Route: /users
 *Method:POST
 *Description:Creating new user
 *Access: public
 *Parameters: none
 */
app.post("/users", (req, res) => {
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
 *Route: /users/:id
 *Method:PUT
 *Description:updating a user by their id
 *Access: public
 *Parameters: id
 */
app.put("/users/:id", (req, res) => {
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

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This  route doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
