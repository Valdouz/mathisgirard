#!/usr/bin/env bash
cd /home/ec2-user/discord-bot
echo "installing packages"
sudo npm install
echo "rebuilding packages"
sudo npm rebuild