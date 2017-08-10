## wcfff
Batch `watermark`, `crop` and `format` videos.

## Install
```
npm install -g wcfff
```

## Dependency
1. This command invoke [ffmpeg](https://ffmpeg.org/) to do the true work, so please ensure `ffmpeg` works well on your machine.
2. The watermark should be placed as `logo.png` in the working directory.

## Usage
```
wcfff init
```
This command will create `config.cfg` which looks like below:
```
./FizzBuzz intro.mov | 00:00:00 | 00:01:35
./FAQ & END.mov | 00:00:00 | 00:05:02
./FizzBuzz demo.mov | 00:00:00 | 00:15:33
./How to do TDD.mov | 00:00:00 | 00:02:39
./What is TDD.mov | 00:00:00 | 00:06:30
./How to learn TDD.mov | 00:00:00 | 00:03:44
./Why TDD.mov | 00:00:00 | 00:02:13
```
Then you can preview your source videos and open this file to edit the start time at the second column and the end time at the third column.
Once you satisfied, run this command to invoke `ffmpeg` to do the work:
```
wcfff go
```

`Caution`: It should take a while to complete, depends on your hardware and the size of your source files.

## License
Licensed under [MIT](https://fredwu.mit-license.org/).
