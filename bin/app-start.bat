
echo "starting jeeves"
cd /home/ec2-user/discord-bot
pm2 start main.js --name="jeeves"
echo "jeeves started"