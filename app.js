const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb+srv://admin-prem:wtpmjgda123@cluster0-tozsr.mongodb.net/listdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const listSchema = {
  itemName: {
    type: String,
    required: true,
  },
};

const Item = mongoose.model("item", listSchema);

app.get("/", (req, res) => {
  res.render("top.ejs");
});

app.get("/index", (req, res) => {
  Item.find({}, function (err, items) {
    res.render("index.ejs", {
      items: items,
    });
  });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/create", (req, res) => {
  const item1 = new Item({
    itemName: req.body.itemName,
  });
  item1.save();
  res.redirect("/index");
});

app.post("/delete/:id", (req, res) => {
  const requestedid = req.params.itemid;
  Item.deleteOne({ id: requestedid }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("succes delete");
    }
  });
  res.redirect("/index");
});

// app.get("/edit/:id", (req, res) => {
//   connection.query(
//     "SELECT * FROM items WHERE id = ?",
//     [req.params.id],
//     (error, results) => {
//       res.render("edit.ejs", { item: results[0] });
//     }
//   );
// });

// app.post("/update/:id", (req, res) => {
//   // Write code to update the selected item
//   connection.query(
//     "update items set name=? where id=?",
//     [req.body.itemName, req.params.id],
//     (error, results) => {
//       res.redirect("/index");
//     }
//     // Delete the following redirect to the list page
//   );
// });

app.listen(process.env.PORT || 8000, () => {
  console.log("app is running at 8000");
});
