const Content = require("../models/content");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const uniqueId = uuidv4();
const axios = require('axios');
const fs = require('fs');
const passport = require("passport");

const incLikeCount = async (req, res) => {
    
    try {
        const contentid = req.query.contentid;
        var likes = await Content.findOne({ contentID: contentid }).likeCount ;
        likes=likes+1
        const updates = await Content.findOneAndUpdate({ contentID: contentid },{likeCount: likes})
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  const showdata = async (req, res) => {
    try {
      
      let results = [];
      if (req.query.subjectid) {
          const subjectid = req.query.subjectid;
          results = await Content.find({ subjectID: subjectid});
      }
      
      if (req.query.contentid) {
        const contentid = req.query.contentid;
        results = await Content.findOne({ contentID: contentid});
      }

      if (req.query.contenttype) {
        const type = req.query.contenttype;
        results = await Content.find({ contentType: type});
      }

      if (req.query.contenttype && req.query.subjectid) {
        const type = req.query.contenttype;
        const subjectid = req.query.subjectid;
        results = await Content.find({ contentType: type,  subjectID: subjectid});
      }


      res.json(results);
  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error occurred' });
  }
  };


  const incDislikeCount = async (req, res) => {
    
    try {
        const contentid = req.query.contentid;
        var likes = await Content.findOne({ contentID: contentid }).dislikeCount ;
        likes=likes+1
        const updates = await Content.findOneAndUpdate({ contentID: contentid },{dislikeCount: likes})
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  var content = req.file.buffer.toString('base64');
  var data = JSON.stringify({
    "message": "file uploaded",
    "content": `${content}`
  
});
      const filename = Date.now() + '-' + req.file.originalname;

var config = {
    method: 'put',
    url: `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${filename}`,
    headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
    },
    data: data,
};

axios(config)
    .catch(function (error) {
        console.log(error);
    });
      
    const contentData = {
      contentName: filename,
      pdfFile: config.url ,
      contentType: req.query.type,
      author: req.query.token,
      subjectID: req.query.subjectid,
      contentID: uniqueId
    };
    const savedFile = await Content.create(contentData);
    return res.status(200).json({ message: 'File uploaded successfully', savedFile });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

  module.exports = { incLikeCount,incDislikeCount, showdata , upload,handleFileUpload};
