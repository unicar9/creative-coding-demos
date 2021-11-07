console.log("haha");

const wrapper = document.querySelector(".wrapper");

const upload = document.getElementById("upload");
const audioPlayer = document.getElementById("audioPlayer");

const btn = document.querySelector(".btn");

upload.addEventListener("change", e => {
  audioPlayer.src = URL.createObjectURL(e.target.files[0]);
  //   audioPlayer.play();
});

btn.addEventListener("click", () => {
  startAnimation = true;
  thumbnails = [];
  audioPlayer.play();
  wrapper.style.display = "none";
});
