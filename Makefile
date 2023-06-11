include .env

include ${OS}.mk

GIT_MAIN_BRANCH = main

# git commands
cmt-%:
# 日本語が文字化けする
	git commit -m "${@:cmt-%=%}"

push:
	git push origin HEAD

pull:
	git checkout ${GIT_MAIN_BRANCH}
	git pull origin ${GIT_MAIN_BRANCH}

newb-%:
	git checkout -b ${@:newb-%=%}

delb-%:
	git branch -d ${@:delb-%=%}