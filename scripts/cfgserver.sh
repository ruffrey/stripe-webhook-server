#!/bin/sh


### FIRST STEPS: ###
# Kid tested, Ubuntu server 12.04 approved
#
# 1. apt-get update && apt-get upgrade && apt-get install git nano
# 2. cd /root && git clone YOUR_REPO_HERE sws
# 3. Check paths and ENV vars in start.sh 
# 		(use whereis to confirm path locations for binaries)
# 4. cd sws/scripts && sh cfgserver.sh

#
# uninstall unnecessary stuff
	echo "$(date) Unstalling Apache"
		apt-get remove --purge apache2 apache2-utils
	
	echo "$(date) Unstalling sendmail and postfix"
		apt-get remove sendmail sendmail-bin postfix
		apt-get purge postfix exim4 sendmail sendmail-bin
	
# install deps
	echo "$(date) - Installing dependencies"
		apt-get install curl python-software-properties g++ python make nodejs npm
		
		#add-apt-repository ppa:chris-lea/node.js
		#apt-get update
		#apt-get install nodejs npm
		
	echo "$(date) - Installing Forever"
		npm install forever -g
	

# Putting startup script in place
echo "$(date) - Copying startup script"
	cp /root/sws/scripts/startsws /root

# CRON job
echo "$(date) - Creating cron job"
	cp /root/sws/scripts/appboot /etc/cron.d/appboot

# finish message
echo "$(date) - Server has finished configuring."

# boot app
echo "$(date) - Rebooting in 5"
	sleep 1
echo "$(date) - Rebooting in 4"
	sleep 1
echo "$(date) - Rebooting in 3"
	sleep 1
echo "$(date) - Rebooting in 2"
	sleep 1
echo "$(date) - Rebooting in 1"
	sleep 1

reboot
