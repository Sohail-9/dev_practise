const express = require("express");
const app = express();

// const zd = require("zod");
const jwt = require("jsonwebtoken");
const sec = "1234";

//middleware
app.use(express.json());

// const email = zd.string().includes("@gmail.com");
// const pass = zd.string().min(6);

function usermiddleware(req, res, next) {
    const age = req.body.age;
    if (age >= 18) {
        next();
    } else {
        res.status(401).json({ message: "you are not allowed to access this" });
    }
}
const val = [
    {
        name: "basha",
        age: 23,
    },
];

const vr = jwt.sign({ data: val }, sec);
console.log(vr);

const data = jwt.verify(vr, sec);
console.log(data);

// function tocheck(username, password) {
//   if (!username == null || !password == null) {
//     res.status(400).json({ message: "invalid username or password" });
//   } else {
//     res.status(200).json({ message: "success" });
//   }
// }

//best to write middleware is 
app.use(usermiddleware, (req, res, next) => {
    next();
});

//amusemment park routing
app.get("/rides", function (req, res) {
    res.status(200).json({
        msg: "u are eligible",
    });
});
//waterpark routing
app.get("/water", function (req, res) {
    res.status(200).json({
        msg: "user is under age",
    });
});
//function calling
// const ds = tocheck("basga@gmail.com", "12344");
// console.log(ds);

//port opening
app.listen(3000);
