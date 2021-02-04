var CronJob = require('cron').CronJob;
const sound = require("sound-play");
const path = require("path");
const filePath = path.join(__dirname, "alarm.mp3");

let job = new CronJob('*/5 * * * * *', () => {
  console.log('Every 5 Second');
  sound.play(filePath);
}, null, true, 'America/New_York');

job.start();