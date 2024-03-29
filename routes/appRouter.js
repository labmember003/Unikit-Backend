const express = require("express");
const appRouter = express.Router();

const assetlinks =[{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.falcon.unikit",
      "sha256_cert_fingerprints":
      ["CB:32:18:30:38:78:FF:21:E8:BB:10:12:A2:44:C7:EB:14:57:E3:6A:8E:15:8B:56:1A:F9:26:E8:DF:FC:C0:59"]
  }
  }];

appRouter.get('/assetlinks.json', (req, res) => {
    res.json(assetlinks);
});

module.exports = appRouter;
