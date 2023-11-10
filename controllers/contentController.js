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
      
      let results = {};
      if (req.query.subjectid) {
          const subjectid = req.query.subjectid;
          results = await Content.find({ subjectID: subjectid});
      }

      if (req.query.contentid) {
        const contentid = req.query.contentid;
        results = await Content.find({ contentID: contentid});
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
