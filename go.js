#!/usr/bin/env node

const fs = require("fs");
const { exec } = require('child_process');

const dstDir = 'Edited';

let readConfig = (fileName) => {
  return fs.readFileSync(fileName).toString().trim().split("\r\n");
};

let parse = (config) => {
  let array = config.split("|");
  return {
    "name": array[0].trim(),
    "ss": array[1].trim(),
    "to": array[2].trim()
  };
}

let toShellCommands = (configs) => {
  return configs.map(c => {
    let config = parse(c);
    return `ffmpeg -i "${config.name}" -i logo.png -filter_complex 'overlay=main_w-overlay_w-40:main_h-overlay_h-60' -ss ${config.ss} -to ${config.to} -f mp4 "./${dstDir}/${config.name}"`;
  });
}

let execute = (shellCommands) => {
  shellCommands.forEach(cmd => {
    exec(cmd, {maxBuffer: Infinity}, (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(stdout);
    })
  });
}

let setup = () => {
  if (!fs.existsSync(dstDir)) {
    fs.mkdirSync(dstDir);
  }
}

setup()
let configs = readConfig("config.cfg");
let shellCommands = toShellCommands(configs);
execute(shellCommands);
