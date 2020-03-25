const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

// Define Paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setup handlbars engine and view locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kumari Shivani Singh"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About US",
    name: "Kumari Shivani Singh"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help Please",
    title: "Help",
    name: "Kumari Shivani Singh"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.query;
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kumari Shivani Singh",
    errorMessage: "Help Article Not Found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kumari Shivani Singh",
    errorMessage: "Page Not Found"
  });
});

app.listen(port, () => {
  console.log("Server is Up on port no. "+port);
});