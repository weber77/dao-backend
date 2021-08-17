
module.exports = app => {
    const social_media = require("../controllers/social_media.controller");
  
    var router = require("express").Router();
  
    router.get("/findById", social_media.findById);
  
    app.use('/api/sm', router);
  };