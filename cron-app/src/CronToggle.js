import React, { useState } from 'react';
import { ToggleButton } from '@material-ui/lab';
import useSound from 'use-sound';
import alarmSound from './alarm.mp3';
import UIfx from 'uifx';
import toast from './toast.png';
import addNotification from 'react-push-notification';

var beep = new UIfx(alarmSound);
var CronJob = require('cron').CronJob;


export function CronToggle(props) {
  const [cronval, setCronval] = useState(props.cronstring);
  const [cronjob, setCronJob] = useState(new CronJob(props.cronstring, () => {
	  console.log('working ' + cronval);
	  addNotification({
            title: 'Cron Alarm Notification',
            message: props.message,
			icon: toast,
			duration: props.notifDuration,
			silent: true,
            native: true 
        });
	  beep.play(1.0);
	  
  }, null, false, 'America/New_York'));
  const [toggled, setToggled] = useState(false);
  
  const onToggle = () => {
   	if(!toggled) {
	  cronjob.start();	
	  console.log('started')
	} else {
	  cronjob.stop();
	  console.log('stopped')
	}  
    setToggled(!toggled); 
  };
  
  return (
	<ToggleButton
	  value={cronval}
	  selected={!toggled}
	  onChange={onToggle}
	>
	{toggled ? 'Running' : 'Disabled'} : {cronval}
	</ToggleButton>
  );
  
}

