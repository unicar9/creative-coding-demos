console.log("haha");

const wrapper = document.querySelector(".wrapper");

const upload = document.getElementById("upload");
const audioPlayer = document.getElementById("audioPlayer");

const btn = document.querySelector(".btn");

const form = document.querySelector("form");

upload.addEventListener("change", (e) => {
  audioPlayer.src = URL.createObjectURL(e.target.files[0]);
});

btn.addEventListener("click", () => {
  startAnimation = true;
  thumbnails = [];
  audioPlayer.play();
  wrapper.style.display = "none";
});

form.addEventListener("submit", (e) => {
  const data = new FormData(form);
  colorIndex = data.get("color_scheme");
  console.log("colorIndex: ", colorIndex);

  bgColor = bgColors[colorIndex];
  planeStroke = planeStrokeColors[colorIndex];
  moonColor = moonColors[colorIndex];
  musicBarColor = musicBarColors[colorIndex];
  e.preventDefault();
});

wrapper.addEventListener("drop", (e) => {
  e.preventDefault();
});

wrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
});
