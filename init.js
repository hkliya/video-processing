#!/usr/bin/env node

const _getDuration = require('get-video-duration');
const sprintf=require("sprintf-js").sprintf;
const fs = require("fs");

let listFiles = function(dir) {
    var filesystem = require("fs");
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(listFiles(file))
        } else results.push(file);

    });

    return results;
};

let getDuration = (videos) => {
  videos.forEach((video) => {
    _getDuration(video).then((duration) => {
      let line = `${video} | 00:00:00 | ${formatTime(duration)}\r\n`;
      fs.appendFile("config.cfg", line, (err) => {
        if (err) {
          console.log(err);
        }
      })
    });
  })
}

let formatTime = (seconds) => {
  let intSeconds = Math.floor(seconds);
  let m = intSeconds / 60; 
  let s = intSeconds % 60;
  return sprintf("00:%02d:%02d", m, s);
}

let videoFiles = listFiles(".").filter(name => !name.startsWith("./.") && name.endsWith(".mov"));
let videosWithDuration = getDuration(videoFiles);
