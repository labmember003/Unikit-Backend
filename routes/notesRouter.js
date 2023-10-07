const express = require("express");
const passport = require('passport');
const notesController=require("../controllers/notesController");

const notesRouter = express.Router();
notesRouter.post('/likeCount',passport.authenticate('jwt', { session: false }), notesController.incLikeCount);
notesRouter.post('/dislikeCount',passport.authenticate('jwt', { session: false }), notesController.incDislikeCount);

module.exports = notesRouter;
