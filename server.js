const exp = require("express")
require("dotenv").config();
const request = require("request")
const path = require("path")
const { engine } = require("express-handlebars")
var web = path.join(__dirname, "/web")
const app = exp()
app.use(exp.static(__dirname + "/public"))
app.use(exp.static(web))
app.get("", (req, res) => {
    res.render("form")
})
app.engine(
    "hbs",
    engine({
        layoutsDir: __dirname + "/views/layouts",
        defaultLayout: "main.hbs",
    })
);
app.set("view engine", "hbs")
app.get("/login", (req, res) => {
    var text = req.query.text;
    var t = req.query.t;
    var s = req.query.s;


    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': process.env.translator_api_key,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        form: {
            q: text,
            target: t,
            source: s
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var ans = body.substring(44);
        var ansf = ans.substring(0, ans.length - 5)
        res.render("form",
            {
                ans: ansf
            })
    });
});


app.listen(3000, () =>
    console.log("Server up and running")
);
