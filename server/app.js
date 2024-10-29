if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();

const routes = require("./routes/router");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(routes);
app.use(errorHandler);

module.exports = app;

// const express = require("express");
// const app = express();
// const cors = require("cors"); // <-- tambahkan ini di server teman-teman
// const port = 3000;
// app.use(cors()); // <-- tambahkan ini di server teman-teman
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });
