const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const http = require("http");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const auth = require("./middleware/auth");
const { clearImage } = require("./util/file");

const app = express();

const httpServer = http.createServer(app);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

app.put("/post-image", (req, res, next) => {
  if (!req.isAuth) {
    throw new Error("Not authenticated!");
  }
  if (!req.file) {
    return res.status(200).json({ message: "No file provided!" });
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res
    .status(201)
    .json({ message: "File stored.", filePath: req.file.path });
});

const server = new ApolloServer({
  typeDefs: graphqlSchema,
  resolvers: graphqlResolver,
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: graphqlSchema,
    resolvers: graphqlResolver,
    formatError: (formattedError, error) => {
      // console.log(formattedError);
      // console.log(error.code);
      // custom error here
      return formattedError;
    },
  });
  await server.start();
  app.use(
    expressMiddleware(server, {
      context: ({ req }) => {
        return {
          myReq: req,
        };
      },
    })
  );
};

mongoose
  .connect("mongodb://root:root@localhost:27017/", {
    dbName: "feed",
  })
  .then((result) => {
    startServer();
    return new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  })
  .catch((err) => console.log(err));
