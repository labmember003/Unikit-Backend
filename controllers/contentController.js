const content = require("../models/content");

const incLikeCount = async (req, res) => {
    
    try {
        const contentid = req.contentid;
        const likes = await content.find({ contentID: contentid }).likeCount ;
        likes=likes+1
        const updates = await content.findOneAndUpdate({ contentID: contentid },{likeCount: likes})
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  const showdata = async (req, res) => {
    try {
      const {
          subjectid,
          contentid
      } = req.query;

      let query = {};

      if (subjectid) {
          query.collegeId = collegeId;
      }

      if (contentid) {
        query.courseId = courseId;
      }


      let results = {};

      if (subjectid) {
          query.subjectid = subjectid;
      }

      if (contentid) {
        query.contentid = contentid;
      }
      res.json(results);
  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error occurred' });
  }
  };


  const incDislikeCount = async (req, res) => {
    
    try {
        const contentid = req.contentid;
        const likes = await content.find({ contentID: contentid }).dislikeCount ;
        likes=likes+1
        const updates = await content.findOneAndUpdate({ contentID: contentid },{dislikeCount: likes})
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  module.exports = { incLikeCount,incDislikeCount, showdata };
