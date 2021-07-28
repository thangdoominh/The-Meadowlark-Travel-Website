// meadowlark.js
var express = require("express")

var app = express()
var fortune = require("./lib/fortune")

// Declare static middleware
app.use(express.static(__dirname + "/public"))

// Set up handlebars view engine
var handlesbars = require("express-handlebars").create({
    defaultLayout: "main",
})
app.engine("handlebars", handlesbars.engine)
app.set("view engine", "handlebars")

app.set("port", process.env.PORT || 3000)

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/about", (req, res) => {
    res.render("about", { fortune: fortune.getFortune() })
})

// Custom 404 page
app.use((req, res) => {
    res.status(404)
    res.render("404")
})

// Custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500)
    res.render("500")
})

app.listen(app.get("port"), () => {
    console.log(
        "Express started on http://localhost:" +
            app.get("port") +
            "; press Ctrl-C to terminate."
    )
})
