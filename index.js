const argv = require('minimist')(process.argv.slice(2), {
  default: { cron: '0 14,44 * * * *' }
});
console.log(`Using cron string of ${argv.cron}`);

const CronJob = require('cron').CronJob;
const sound = require("sound-play");
//const notifier = require('node-notifier');
const WindowsToaster = require('node-notifier').WindowsToaster;

var notifier = new WindowsToaster({
  withFallback: false, // Try Windows Toast and Growl first?
  customPath: undefined // Relative/Absolute path if you want to use your fork of notifu
});

const path = require("path");
const filePath = path.join(__dirname, "alarm.mp3");

let job = new CronJob(argv.cron, () => {
  notifier.notify({
	  title: 'Cron Alarm Notification',
	  message:'It\'s TIME',
	  icon: path.join(__dirname, 'toast.png'),
	  sound: false,
  });
  sound.play(filePath);
}, null, true, 'America/New_York');
notifier.on('click', function (notifierObject, options, event) {
  console.log('closed')
});