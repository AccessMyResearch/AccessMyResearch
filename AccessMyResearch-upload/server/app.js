/*
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

const USER_ID = 1; //TODO: Remove fake user id

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/search", (req, res) => {
  console.log(req.body);
  client.hgetall(USER_ID, function(err, value) {
    res.status(200);
    res.send(value);
  });
});

app.post("/search", (req, res) => {
  for (const [key, value] of Object.entries(req.body)) {
    client.hmset(USER_ID, key, value);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/

// server
// npm install aws-sdk

const express = require("express");
const mime = require("mime");
const app = express();
const port = 3000;

const { v4: uuidv4 } = require('uuid');

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const AWS = require("aws-sdk");
const { default: axios } = require("axios");
const s3 = new AWS.S3({
  signatureVersion: 'v4',
  //accessKeyId: "<aws_access_key_id>", // aws access id here
  accessKeyId: "",
  secretAccessKey: "", 
  //secretAccessKey: "<aws_secret_access_key>", // aws secret access key here
  useAccelerateEndpoint: true
});

// api endpoint to get signed url
app.get("/get-signed-url", async (req, res) => {
  const { scope, type, count, title} = req.query

  if (!scope) {
    res.status(400).json({
      message: "Scope parameter is required"
    })
    return
  }

  if (!type) {
    res.status(400).json({
      message: "Type parameter is required"
    })
    return
  }

  if(!title) {
    res.status(400).json({
      message: "Title of work required"
    })
    return
  }

  const parsedCount = isNumeric(count) ? parseInt(count) : 1

  const parsedType = decodeURIComponent(`${type}`)
  const extension = mime.getExtension(parsedType) || "pdf"

  const key = `${scope}/${uuidv4()}.${extension}`

  const md = `${title}`

  const params = {
    Bucket: "amrtestdocs",
    // expiry time
    Expires: 60*60, // 60 minutes
    ACL: "public-read",
    ContentType: parsedType
  };

  try {
    let urls = []
    for (let i = 0; i < parsedCount; i++) {
      const key = `${scope}/${uuidv4()}.${extension}`
      const md = `${title}`
      const finalParams = {
        ...params,
        Key: key,
        Metadata: {
          "Title": md,
        }
      }
      const signedUrl = await s3.getSignedUrlPromise("putObject", finalParams)

      if (signedUrl) {
        urls.push({ signedUrl, key })
      }
    }

    res.json({ data: { urls } })
    return
  } catch (e) {
    res.status(400).json({message: `Bad request: ${e}`})
    return
  }

  // const fileurls = [];
  // s3.getSignedUrl("putObject", params, function(err, url) {
  //   if (err) {
  //     console.log("Error getting presigned url from AWS S3");
  //     res.json({
  //       success: false,
  //       message: "Pre-Signed URL error",
  //       urls: fileurls
  //     });
  //     return err;
  //   } else {
  //     fileurls[0] = url;
  //     console.log("Presigned URL: ", fileurls[0]);
  //     res.json({
  //       success: true,
  //       message: "AWS SDK S3 Pre-signed urls generated successfully.",
  //       urls: fileurls
  //     });
  //     return url;
  //   }
  // });
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));
