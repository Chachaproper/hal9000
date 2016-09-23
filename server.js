'use strict';

const koa    = require('koa')();
const router = require('koa-router')();
const views  = require('koa-views');
const logger = require('koa-logger');
const serve  = require('koa-static');

router
  .get('/', function*() {
    yield this.render('index');
  })
  .get('/admin', function*() {
    yield this.render('admin');
  });

koa
  .use(logger())
  .use(views('./templates', {
    extension: 'pug'
  }))
  .use(serve(process.cwd()))
  .use(router.routes())
  .use(router.allowedMethods());

const http = require('http').Server(koa.callback());
const io   = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connection');

  socket.on('text', (data) => {
    io.sockets.emit('speak', data);
  });
});

const server = http.listen(3000);
console.log('Server listening on port: ' + server.address().port);
