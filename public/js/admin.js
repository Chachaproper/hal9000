'use strict';

let app = {};

app.init = function() {
  const socket = io();

  socket.on('connect', () => {
    console.log('connect');
  });

  document.onkeypress = (e) => {
    e = e || window.event;

    if (e.keyCode !== 13) {
      return;
    }

    socket.emit('text', {
      text: document.querySelector('textarea').value
    });

  };

  socket.on('disconnect', () => {
    console.log('disconnect');
  });
};

document.addEventListener('DOMContentLoaded', app.init);
