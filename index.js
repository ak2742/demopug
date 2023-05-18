const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

app.use("/static", express.static("static"));
app.use(express.urlencoded({  limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb' }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./view"));

const dummy = fs.readFileSync("./dummy.txt", { encoding: "utf8" });

app.get("/", (req, res) => {
  let params = {
    title: "Home",
    postDescription1: dummy,
    postTitle1: "Title of the post",
  };
  res.status(200).render("index.pug", params);
});

app.get("/home", (req, res) => {
  let params = {
    title: "Home",
    postDescription1: dummy,
    postTitle1: "Title of the post",
  };
  res.status(200).render("index.pug", params);
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact.pug", { title: "Contact" });
});

app.get("/latest", (req, res) => {
  let params = {
    title: "Latest",
    postDescription1: dummy,
    postTitle1: "Title of the post",
  };
  res.status(200).render("latest.pug", params);
});

app.get("/post/", (req, res) => {
  let params = {
    title: "Title of the post",
    postDescription: dummy,
    postTitle: "Title of the post",
  };
  res.status(200).render("details.pug", params);
});

app.post("/thanks", (req, res) => {
  let data = JSON.stringify(req.body)
  let outputToWrite = `${data}
`
  fs.appendFileSync("output.txt", outputToWrite);
  res.status(200).render("thanks.pug", { title: "THANKS" });
});

app.use(function (req, res) {
  let params = {
    title: "PAGE NOT FOUND",
    errcode: 404,
    error: "This page is not available",
  };
  res.status(404).render("error.pug", params);
});

app.use(function (req, res) {
  let params = {
    title: "SERVER ERROR",
    errcode: 500,
    error: "Internal server error",
  };
  res.status(500).render("error.pug", params);
});

app.listen(port, () => {
  console.log(`Go to 'localhost' or 'localhost:${port}' in browser`);
});
