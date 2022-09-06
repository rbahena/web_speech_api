// Reference: https://www.ebooz.com/como-anadir-un-sintetizador-de-texto-a-voz-de-audio-a-tu-pagina-web/

onload = function () {
  if ("speechSynthesis" in window) {
    /* speech synthesis supported */
    alert("Soy compatible");
  } else {
    alert("No soy compatible");

    /* speech synthesis not supported */
  }

  if ("speechSynthesis" in window) {
    var synth = speechSynthesis;
    var flag = false;

    /* references to the buttons */
    var playEle = document.querySelector("#play");
    var pauseEle = document.querySelector("#pause");
    var stopEle = document.querySelector("#stop");

    /* click event handlers for the buttons */
    playEle.addEventListener("click", onClickPlay);
    pauseEle.addEventListener("click", onClickPause);
    stopEle.addEventListener("click", onClickStop);

    function onClickPlay() {
      if (!flag) {
        flag = true;
        utterance = new SpeechSynthesisUtterance(
          document.querySelector("article").textContent
        );
        utterance.voice = synth.getVoices()[1];
        utterance.onend = function () {
          flag = false;
        };
        synth.speak(utterance);
      }
      if (synth.paused) {
        /* unpause/resume narration */
        synth.resume();
      }
    }
    function onClickPause() {
      if (synth.speaking && !synth.paused) {
        /* pause narration */
        synth.pause();
      }
    }
    function onClickStop() {
      if (synth.speaking) {
        /* stop narration */
        /* for safari */
        flag = false;
        synth.cancel();
      }
    }
  }
};

//#region get_voices
function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  const voices = speechSynthesis.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
//#endregion
