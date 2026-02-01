const display = document.getElementById("display");
const pads = document.querySelectorAll(".drum-pad");
const drumMachine = document.getElementById("drum-machine");
const powerToggle = document.getElementById("power-toggle");
const powerStatus = document.getElementById("power-status");

let powerOn = powerToggle.checked;
display.innerText = "Power On";
//toggle power on/off event listener
powerToggle.addEventListener("change", togglePower);

//click event on each pad
pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    triggerPad(pad);
  });
});

//keybord sound on each pad
//keydown event is global
document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  const audio = document.getElementById(key);
  if (audio) {
    const pad = audio.parentElement;
    triggerPad(pad);
  }
});

//clears the display if clicked anywhere but in pads
/*
drumMachine.addEventListener("click",e =>{
  if(!e.target.closest(".drum-pad")){
    display.innerText = "";
  }
});
*/

//trigger function for the audio and display
function triggerPad(pad) {
  if (!powerOn) return;
  /*pad.query.. and not document.quer.. because it selects the .clip of the pad and if we use document.query.. we select only the first .clip */
  const audio = pad.querySelector(".clip");
  pad.classList.add("active");
  audio.currentTime = 0;
  audio.play();
  display.innerText = pad.dataset.sound;
  setTimeout(() => {
    pad.classList.remove("active");
  }, 150);
}

//toggle Power on/off function
function togglePower() {
  powerOn = powerToggle.checked;

  powerStatus.innerText = powerOn ? "On" : "Off";
  display.innerText = powerOn ? "Power On" : "Power Off";

  drumMachine.classList.toggle("off", !powerOn);
}
