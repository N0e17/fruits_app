const express = require("express");
const router = express.Router();

const fruit = require("../Models/fruit_schema");

// router.get("/", (req, res) => {
//   res.redirect("/fruits");
//   //   res.send("Hello from new fruits");
// });

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  fruit.create(req.body, (err, createdFruit) => {
    if (err) {
      console.log(err);
    } else {
      //res.send(createdFruit);
      //res.send(createdFruit);
      res.redirect("/fruits");
    }
  });
  //   res.send(req.body);
});
router.get("/", (req, res) => {
  fruit.find({}, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index.ejs", { fruits: response });
    }
  });
});

//Route to show fruit details id
router.get("/:id", (req, res) => {
  fruit.findById(req.params.id, (err, foundFruit) => {
    if (err) {
      console.log(err);
    } else {
      //res.send(foundFruit);
      res.render("view.ejs", { fruit: foundFruit });
    }
  });
});

router.get("/:id/edit", (req, res) => {
  //   res.send("Deleting...");
  fruit.findById(req.params.id, (err, foundFruit) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit.ejs", { fruit: foundFruit });
    }
  });
});

router.delete("/:id", (req, res) => {
  //   res.send("Deleting...");
  fruit.findByIdAndDelete(req.params.id, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/fruits");
    }
  });
});

router.put("/:id", (req, res) => {
  req.body.readyToEat = req.body.readyToEat === "on";
  fruit.findByIdAndUpdate(req.params.id, req.body, (err, update) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/fruits");
    }
  });
});

// app.get("/fruits/:id/edit", (req, res) => {
//   //   res.send("Deleting...");
//   fruit.findByIdAndDelete(req.params.id, (err, success) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/fruits");
//     }
//   });
// });

// app.post("/fruits", (req, res) => {
//   res.send(req.body);
// });

router.get("/seed", (req, res) => {
  fruit.insertMany(
    [
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: true,
      },
      {
        name: "banana",
        color: "yellow",
        readyToEat: false,
      },
    ],
    (err, success) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/fruits");
      }
    }
  );
});

module.exports = router;
