const express = require("express");
const cors = require("cors");
const router = require("./src/routers/image");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

app.use(express.json());

app.use(router);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
