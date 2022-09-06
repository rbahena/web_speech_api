if (!'speechSynthesis' in window) {
    showNotify({
      msn: 'Your browser not support tha Web Speech API',
      show: true,
      type: 'success'
    });
    return false;
  }

  let voice = new SpeechSynthesisUtterance();
  let jarvis = window.speechSynthesis;