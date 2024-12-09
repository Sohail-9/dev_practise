const express = require("express");
const zod = require("zod");
const app = express();
//middleware
app.use(express.json());

const schema = zod.object({
    username: zod.string(),
    password: zod.string(),
});
async function middleware(req, res, next) {
    await next();
}
// User middleware
function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if (username != "admin" || password != "pass") {
        res.status(400).json({ msg: "Invalid username or password" });
    } else {
        next();
    }
}

// Kidney middleware
function kidneyMiddleware(req, res, next) {
    const kidneyId = Number(req.query.kidneyId);
    if (kidneyId !== 1 && kidneyId !== 2) {
        res.status(401).json({ msg: "Kidney ID not found" });
    } else {
        next();
    }
}

app.post("/health-checkup", function (req, res) {
    // const kidneys = req.body.kidneys;
    const username = req.header.username;
    const password = req.header.password;
    const nums = schema.safeParse(username, password);

    if (!nums.success) {
        res.status(411).json({
            msg: "invalid input",
        });
    } else {
        res.send({
            nums,
        });
    }
});

app.get("/kidney-check", userMiddleware, kidneyMiddleware, function (req, res) {
    res.send("Kidney check is ok");
});

global catches 4 values to throw safe check
app.use(function (err, req, res, next) {
    res.status(500).send("something went wrong")
})

// Start the server
app.listen(3000);
function () {
    console.log("Server is running on port 3000");
});
middleware create karthu hu
const express = require("express");
const app = express();

// const z = require("zod");

const jwt = require("jsonwebtoken");
const jwtpass = "1234";

// const user = z.array(z.username, z.email, z.age);
app.use(express.json());
const user = [
    {
        username: "user1",
        email: "user1@gmail.com",
        age: 23,
    },
    {
        username: "user2",
        email: "user2@gmail.com",
        age: 21,
    },
    {
        username: "user3",
        email: "user3@gmail.com",
        age: 26,
    },
];

function userexits(username, age) {
    let userexits = false;
    for (let i = 0; i < user.length; ++i) {
        if (user[i].username == username && user[i].age == age) {
            userexits = true;
        }
    }
    return userexits;
}

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const age = req.body.age;
    if (!userexits(username, age)) {
        return res.status(401).json({
            msg: "user not found in db",
        });
    }
    var token = jwt.sign({ username: username, age: age }, jwtpass);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.author;
    const decoded = jwt.verify(token, jwtpass);
    const username = decoded.username;

    res.json({
        db: user,
    });
});

app.listen(3000);
