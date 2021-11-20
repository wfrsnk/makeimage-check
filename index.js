import express from "express";
import multer from "multer";
import sizeOf from "image-size";
import sharp from "sharp";

const PORT = process.env.PORT || 80;
const app = express();
const img = multer({
  dest: "./img",
});

app
  .set("view engine", "ejs")
  .set("views", "views")
  .get("/", (r) => r.res.render("./index"))
  .post("/size2json", img.single("image"), async (r) => {
    const path = r.file.path;
    sizeOf(path, function (err, dimensions) {
      r.res.send({
        width: dimensions.width,
        height: dimensions.height,
      });
    });
  })
  .get("/makeimage", (r) => {
    const width = parseInt(r.query.width);
    const height = parseInt(r.query.height);
    sharp("./img/white.png")
      .resize(width, height)
      .toFile("./img/output.png", (err, info) => {
        r.res.download("./img/output.png");
      });
  })
  .all("/login", (r) => r.res.send("wfrsnk"))
  .listen(PORT, () => {
    console.log("Server has been started...");
  });
