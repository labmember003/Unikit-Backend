const express = require("express");
const passport = require('passport');
const contentController=require("../controllers/contentController");
const contentRouter = express.Router();
contentRouter.post('/likeCount', contentController.incLikeCount);
contentRouter.post('/dislikeCount', contentController.incDislikeCount);
contentRouter.post('/data', contentController.showdata);
module.exports = contentRouter;
