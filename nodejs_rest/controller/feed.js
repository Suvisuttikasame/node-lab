const getFeed = (req, res, next) => {
  res.json({
    title: "this is a post",
    content: "this is content of a title",
  });
};

module.exports.getFeed = getFeed;
