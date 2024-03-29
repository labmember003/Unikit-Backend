const Content = require("../models/content");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const incLike = async (req, res) => {
  try {
    const contentid = req.query.contentid;
    const userid = req.query.userid;
    const content = await Content.findOne({ contentID: contentid });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    const isDisliked = content.dislike.includes(userid);
    const isLiked = content.like.includes(userid);
    if (isDisliked) {
      const updates = await Content.findOneAndUpdate(
        { contentID: contentid },
        {
          $pull: { dislike: userid },
          $push: { like: userid },
        },
        { new: true }
      );

      return res.json({
        contentid: updates.contentID,
        count: updates.like.length,
        likeList: updates.like,
      });
    } else if (isLiked) {
      const updates = await Content.findOneAndUpdate(
        { contentID: contentid },
        {
          $pull: { like: userid },
        },
        { new: true }
      );
      return res.json({
        contentid: updates.contentID,
        count: updates.like.length,
        likeList: updates.like,
      });
    } else {
      const updates = await Content.findOneAndUpdate(
        { contentID: contentid },
        { $push: { like: userid } },
        { new: true }
      );

      return res.json({
        contentid: updates.contentID,
        count: updates.like.length,
        likeList: updates.like,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const report = async (req, res) => {
  try {
    const contentid = req.query.contentid;
    const userid = req.query.userid;

    const content = await Content.findOne({ contentID: contentid });

    if (content && content.report.includes(userid)) {
      return res.status(400).json({
        message: "User ID already reported for this content"
      });
    } else {
      const updates = await Content.findOneAndUpdate(
        { contentID: contentid },
        { $push: { report: userid } },
        { new: true }
      );
      return res.json({
        contentid: updates.contentID,
        count: updates.report.length,
        reportList: updates.report
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showdata = async (req, res) => {
  try {
    let results = [];

    if (req.query.subjectid) {
      const subjectid = req.query.subjectid;
      results = await Content.find({ subjectID: subjectid });
    }

    if (req.query.contentid) {
      const contentid = req.query.contentid;
      results = await Content.find({ contentID: contentid });
    }

    if (req.query.contenttype) {
      const type = req.query.contenttype;
      results = await Content.find({ contentType: type });
    }

    if (req.query.contenttype && req.query.subjectid) {
      const type = req.query.contenttype;
      const subjectid = req.query.subjectid;
      results = await Content.find({ contentType: type, subjectID: subjectid });
    }

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const incDislike = async (req, res) => {
  try {
    const contentid = req.query.contentid;
    const userid = req.query.userid;
    const content = await Content.findOne({ contentID: contentid });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const isLiked = content.like.includes(userid);
    const isDisliked = content.dislike.includes(userid);

    if (isLiked) {
      const updates = await Content.findOneAndUpdate(
        { contentID: contentid },
        {
          $pull: { like: userid },
          $push: { dislike: userid },
        },
        { new: true }
      );

      return res.json({
        contentid: updates.contentID,
        count: updates.dislike.length,
        dislikeList: updates.dislike,
      });
    } else if (isDisliked) {
      const updates = await Content.findOneAndUpdate(
        { contentID: contentid },
        {
          $pull: { dislike: userid },
        },
        { new: true }
      );
      return res.json({
        contentid: updates.contentID,
        count: updates.dislike.length,
        likeList: updates.dislike,
      });
    } else {
      const updates = await Content.findOneAndUpdate(
        { contentID: contentid },
        { $push: { dislike: userid } },
        { new: true }
      );

      return res.json({
        contentid: updates.contentID,
        count: updates.dislike.length,
        reportList: updates.dislike,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const download = async (req, res) => {
  try {
    const contentid = req.body.contentid;
    const config = {
      method: 'get',
      url: `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${contentid}.pdf`,
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
    };

    const response = await axios(config);
    if (response.status === 404) {
      return res.status(404).json({ message: 'File not found on GitHub repo' });
    }
    const downloadUrl = response.data.download_url;
    return res.status(200).json({ githuburl: downloadUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const remove = async (req, res) => {
  try {
    const contentid = req.body.contentid;
    const userid = req.body.token;
    const content = await Content.findOne({ contentID: contentid });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    if (content.author !== userid) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const githubConfig = {
      method: "get",
      url: `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${contentid}.pdf`,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    const githubResponse = await axios(githubConfig);
    if (githubResponse.status !== 200) {
      return res.status(githubResponse.status).json({ message: githubResponse.statusText });
    };
    const config = {
      method: "delete",
      url: `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${contentid}.pdf`,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      data:{
        message: "Deleted content",
        sha: githubResponse.data.sha
      }
    };
    const response = await axios(config);
    const removed = await Content.findOneAndDelete({ contentID: contentid });
    if (!removed) {
      return res.status(404).json({ message: "Content not found" });
    }
    return res.status(200).json({ message: "Content deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failure" });
  }
};

const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const content = req.file.buffer.toString('base64');
    const data = JSON.stringify({
      message: "file uploaded",
      content: content
    });

    const filename = req.query.name;
    const githubname = uuidv4();  
    const config = {
        method: 'put',
        url:`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${githubname}.pdf`,
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        data: data,
      }

    const [githubResponse, savedFile] = await Promise.all([
      axios(config),
      Content.create({
        contentName: filename,
        pdfFile: config.url,
        contentType: req.query.type,
        author: req.query.token,
        subjectID: req.query.subjectid,
        contentID: githubname,
      }),
    ]);

    if (githubResponse.status !== 201) {
      throw new Error(`GitHub API request failed with status ${githubResponse.status}`);
    }

    return res.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'failure' });
  }
};

module.exports = {
  incLike,
  incDislike,
  showdata,
  report,
  download,
  upload,
  handleFileUpload,
  remove
};
