const Content = require("../models/content");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const uniqueId = uuidv4();

const incLikeCount = async (req, res) => {
    
    try {
        const contentid = req.query.contentid;
        const likes = await Content.find({ contentID: contentid }).likeCount ;
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
        results = await Content.find({ contentID: contentid});
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
        const likes = await Content.find({ contentID: contentid }).dislikeCount ;
        likes=likes+1
        const updates = await Content.findOneAndUpdate({ contentID: contentid },{dislikeCount: likes})
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage: storage });

const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const filePath = req.file.path;
    const contentData = {
      contentName: req.file.originalname,
      pdfFile: filePath,
      contentType: req.body.type,
      author: req.body.token,
      subjectID: req.body.subjectid,
      contentID: uniqueId
    };
    const savedFile = await Content.create(contentData);
    return res.status(200).json({ message: 'File uploaded successfully', savedFile });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

  module.exports = { incLikeCount,incDislikeCount, showdata , upload, handleFileUpload};
