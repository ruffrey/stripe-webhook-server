# Configuration scripts

Some scripts to get you up and running real quick on a cheap VPS.

## cfgserver.sh
**Follow instructions in the scripts first.**

Then run it using `sh cfgserver.sh` to set up your Debian based server.

It will uninstall some stuff, and create a cron job to start the app as a service under Forever.js on boot.

## iterate.sh

Run using `sh iterate.sh` to iterate to the next version. Make sure you replace `YOUR_REPO_HERE` with your branch of SWS.

## appboot

Used by cron to start up SWS on boot.

## startsws

The thing cron runs to start SWS. If you want different `NODE_ENV` or `port` environment variables, change them here *before* you run cfgserver.sh.

`startsws` gets copied to /root/startsws if you want to change it in the future without reconfiguring the server under `cfgserver.sh`.

## README.md

You're reading it - rinse and repeat.
