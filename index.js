#!/usr/bin/env node

const program = require("commander");

program
  .version("1.0.0")
  .command("init", "Init the config file for editting")
  .command("go", "Run ffmpeg with config")
  .parse(process.argv);
