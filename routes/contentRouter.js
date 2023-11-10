const express = require("express");
const passport = require('passport');
const contentController=require("../controllers/contentController");
const contentRouter = express.Router();
contentRouter.post('/likeCount',passport.authenticate('jwt', { session: false }), contentController.incLikeCount);
contentRouter.post('/dislikeCount',passport.authenticate('jwt', { session: false }), contentController.incDislikeCount);
contentRouter.post('/data',passport.authenticate('jwt', { session: false }), contentController.showdata);
module.exports = contentRouter;
