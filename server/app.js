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
require("dotenv").config();

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
  region: "us-east-2",
  //accessKeyId: "<aws_access_key_id>", // aws access id here
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  //secretAccessKey: "<aws_secret_access_key>", // aws secret access key here
  useAccelerateEndpoint: true
});
//const all_works = [];

// api endpoint to get signed url
app.get("/get-signed-url", async (req, res) => {
  const { scope, type, count, title, abstract} = req.query

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

  if(!abstract) {
    res.status(400).json({
      message: "Abstract of work required"
    })
    return
  }


  const parsedCount = isNumeric(count) ? parseInt(count) : 1

  const parsedType = decodeURIComponent(`${type}`)
  const extension = mime.getExtension(parsedType) || "pdf"

  const key = `${scope}/${uuidv4()}.${extension}`

  const md = `${title}`

  const params = {
    Bucket: "amruserdocs",
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
      //ISSUE: ABSTRACT CANNOT BE LONGER THAN 192 CHARACTERS OR 28 WORDS
      const ab = `${abstract}`
      //const auth = `${authors}`
      const finalParams = {
        ...params,
        Key: key,
        Metadata: {
          "Title": md,
          "Abstract": ab
          //"Authors": auth,
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

//gets all the objects and puts it in an array
app.get("/files", async(req,res) => {

  const params = {
    Bucket: "amruserdocs",
    Delimiter: '/',
    Prefix: 'krishnab/'
  };
  try{
    const data = await s3.listObjects(params).promise();
    let all_works = []
    let work = []
    
    if(data) {
      for (let index = 1; index < data['Contents'].length; index++) {
        all_works.push(data['Contents'][index]['Key'])
        //console.log(data['Contents'][index]['Key'])        
      }
    }

    for (i = 0; i < all_works.length; i++) {
      //console.log(i + ". " + all_works[i]);
      var keyval = all_works[i].toString()
      //console.log(keyval);
      var params2 = {
        Bucket: "amruserdocs",
        Key: keyval,
      }

      var file = await s3.getObject(params2).promise();
      //console.log(file.Metadata['title'])
      //console.log(file.Metadata['abstract'])

      var title = file.Metadata['title'];
      var abstract = file.Metadata['abstract'];

      work.push([title,abstract]);
    }
    console.log("title: " + work[0][0]);
    console.log("abstract: " + work[0][1]);
    res.json({data: {work}})
    return work
  } catch(e) {
    console.log(e)
    return
  }
});

app.get("/data", async(req,res) => {

  //FIX: THE KEY HAS TO GO THROUGH ALL THE OBJECTS IN all_works
  //console.log(all_works)

  const params = {
    Bucket: "amruserdocs",
    Key: "krishnab/e571d8fc-d9ec-4681-8d08-b9712ad57d9a.pdf",
  };

  try{
    let works = []
    const file = await s3
      .getObject(params)
      .promise();
    //console.log(file.Body.toString('utf-8'));
    if(file) {
      works.push(file.Metadata['title']);
      works.push(file.Metadata['abstract']);
    }
    console.log(works);
    res.json({ data: { works } })
    return works
  }
  catch(e) {
    //res.status(400).json({message: `Bad request: ${e}`})
    console.log(e)
    return
  }

});





app.listen(port, () => console.log(`Server listening on port ${port}!`));
