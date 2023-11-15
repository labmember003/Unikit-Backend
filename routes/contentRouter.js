const express = require("express");
const contentController=require("../controllers/contentController");

const contentRouter = express.Router();

contentRouter.post('/likeCount',contentController.incLikeCount);
contentRouter.post('/dislikeCount', contentController.incDislikeCount);
contentRouter.post('/data', contentController.showdata);
contentRouter.post('/upload', contentController.upload.single('file'),contentController.handleFileUpload);

module.exports = contentRouter;
