#!/bin/sh

while true; do

	read -p "Iterate to newest version? y/n   " yn
	
    case $yn in
	
		[Yy]* ) cd /root; rm /root/psy -r; git clone YOUR_REPO_HERE; break;;

		[Nn]* ) echo "Aborted"; exit;;
		
        * ) echo "Please answer yes or no.";;
		
    esac
	
done
