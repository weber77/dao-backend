const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const dbConfig = require("./app/config/db.config");
const sampleDao = require("./app/config/data.config");

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(morgan("dev"));
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
// const { lodgeCat } = require("./app/models");
// const Role = db.role;
const Dao = db.dao;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to DAOggegate Backend." });
});


require('./app/routes/dao.routes')(app);
require('./app/routes/social_media.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Dao.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            
          sampleDao.forEach(element => {
            new Dao(element).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added new dao to DAOggregate collection");
              });
          });
  
        }
      });

}