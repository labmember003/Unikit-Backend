const express = require("express");
const contentController=require("../controllers/contentController");

const contentRouter = express.Router();

contentRouter.post('/likeCount',contentController.incLike);
contentRouter.post('/dislikeCount', contentController.incDislike);
contentRouter.post('/report', contentController.report);
contentRouter.post('/data', contentController.showdata);
contentRouter.post('/upload', contentController.upload.single('file'),contentController.handleFileUpload);
contentRouter.post('/download', contentController.download);

module.exports = contentRouter;
