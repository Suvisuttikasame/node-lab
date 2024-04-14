const handler = (req, res) => {
  if (req.url === "/") {
    res.write("Hello from node server");
    return res.end();
  }
  if (req.url === "/users") {
    res.write("<html>");
    res.write("<header><title>User</title></header>");
    res.write("<body><ul>");
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      res.write(`<li>${user}</li>`);
    }
    res.write("</ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/create-user" && req.method === "GET") {
    res.write("<html>");
    res.write("<header><title>Create User</title></header>");
    res.write("<body><form action='/create-user'  method='POST'>");
    res.write("<input type='text' name='userName'/>");
    res.write("<button type='submit'>submit</button>");
    res.write("</form></body>");
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", (data) => {
      const message = Buffer.concat(body).toString();
      const name = message.split("=")[1];
      users.push(name);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      res.end();
    });
  }
};

exports.handler = handler;
