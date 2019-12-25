const fs = require('fs');
const path = require('path');
const express = require('express');
const Vue = require('vue');

const server = express();

const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
// eslint-disable-next-line import/order
const renderer = createBundleRenderer(bundle, {
  template: fs.readFileSync('./public/index.html', 'utf-8'),
  runInNewContext: false,
  clientManifest
});


// server.use('/dist', express.static(__dirname + 'dist'));
server.use('/js', express.static(path.join(__dirname, 'dist/js')));
server.use('/css', express.static(path.join(__dirname, 'dist/css')));
server.use('/font', express.static(path.join(__dirname, 'dist/font')));
server.use('/img', express.static(path.join(__dirname, 'dist/img')));
server.use('*.ico', express.static(path.join(__dirname, 'dist')));


// eslint-disable-next-line consistent-return,no-unused-vars
server.get('*', async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const context = {
    title: "Headline News",
    url: req.url
  };
  renderer.renderToString(context, (err, html) => {
    if(err){
      if(err.code === 404){
        res.status(400).end('Not found');
      }else{
        res.status(500).end('Internal server error');
      }
    }else{
      res.end(html);
    }
  });
});

server.listen(10078, () => {
  console.log('server start at 10078');
});
