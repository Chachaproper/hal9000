'use strict';

let app = {};

app.state = {
  synth: {},
  voice: {}
};

app.init = function() {
  const socket = io();

  socket.on('connect', () => {
    console.log('connect');
  });

  socket.on('speak', (data) => {
    console.log(data);
    app.speak(data.text);
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });

  app.state.synth = window.speechSynthesis;

  app.populateVoiceList();
  app.state.synth.onvoiceschanged = app.populateVoiceList.bind;
};

app.populateVoiceList = () => {
  let voices = app.state.synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    if (['ru', 'ru-RU'].includes(voices[i].lang)) {
      app.state.voice = voices[i];
      break;
    }
  }
};

app.speak = (text) => {
  let speech   = new SpeechSynthesisUtterance(text);
  speech.pitch = 1;
  speech.rate  = 0.7;
  speech.voice = app.state.voice;
  speech.lang  = app.state.voice.lang;

  app.state.synth.speak(speech);
};

document.addEventListener('DOMContentLoaded', app.init);
