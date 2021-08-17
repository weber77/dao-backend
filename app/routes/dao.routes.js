
module.exports = app => {
    const dao = require("../controllers/dao.controller");
  
    var router = require("express").Router();
  
    router.get("/findAll", dao.findAll);
    router.post("/create", dao.create);
  
    router.put("/update", dao.update);
    router.post("/addSocialMedia", dao.addSocialMedia);
    router.delete("/delete", dao.delete);

    router.get("/findById", dao.findById);
  
    app.use('/api/dao', router);
  };