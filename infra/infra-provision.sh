#! usr/bin/bash

COMMAND=$1
STACK=$2

COMMAND_ARGS=""

echo "Installing pulumi..."
curl -fsSL https://get.pulumi.com | sh

echo "Set stack..."

pulumi stack select $STACK

echo "Setting pulumi config...."

pulumi config set --secret github_access_token $GH_ACCESS_TOKEN

echo "Run pulumi command..."

if [ $COMMAND = "up" ]
then 
COMMAND_ARGS="--yes"
fi

pulumi $COMMAND $UP_COMMAND_ARGS
