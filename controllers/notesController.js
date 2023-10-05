const notes = require("../models/notes");

const incLikeCount = async (req, res) => {
    
    try {
        const notesid = req.notesid;
        const likes = await notes.find({ notesID: notesid }).likeCount ;
        likes=likes+1
        const updates = await notes.findOneAndUpdate({ notesID: notesid },{likeCount: likes})
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  const incDislikeCount = async (req, res) => {
    
    try {
        const notesid = req.notesid;
        const likes = await notes.find({ notesID: notesid }).dislikeCount ;
        likes=likes+1
        const updates = await notes.findOneAndUpdate({ notesID: notesid },{dislikeCount: likes})
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };