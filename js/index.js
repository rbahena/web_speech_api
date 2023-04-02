onload = function () {
  if ("speechSynthesis" in window) {
    /* speech synthesis supported */
    // alert("Soy compatible");
  } else {
    // alert("No soy compatible");

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
    playEle.addEventListener("mouseover", onClickPlay, false);
    pauseEle.addEventListener("mouseover", onClickPause);
    stopEle.addEventListener("mouseover", onClickStop);

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

//#region mousehover
// let test = document.getElementById("test");

// test.addEventListener("mouseover", function( event ) {
//   alert("Hola: ", event);
// });


// test.addEventListener("mouseout", function( event ) {
//   event.target.style.background = "orange";
// });
//#endregion mousehover

container.onmouseover = container.onmouseout = handler;

function handler(event) {

  function str(el) {
    if (!el) return "null"
    return el.className || el.tagName;
  }

  log.value += event.type + ':  ' +
    'target=' + str(event.target) +
    ',  relatedTarget=' + str(event.relatedTarget) + "\n";
  log.scrollTop = log.scrollHeight;

  if (event.type == 'mouseover') {
    event.target.style.background = 'pink'
  }
  if (event.type == 'mouseout') {
    event.target.style.background = ''
  }
}
