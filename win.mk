MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
MAKEFILE_DIR_ABS:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))

BACKEND_DIR := ${MAKEFILE_DIR_ABS}backend
MOBILE_DIR := ${MAKEFILE_DIR}frontend/mobile

include ${MOBILE_DIR}/.env

IN_BACKEND_DIR := cd ${BACKEND_DIR} &&
IN_MOBILE_DIR := cd ${MOBILE_DIR} &&

TASK_NAME_PREFIX := JoetsuMap

# setup commands
setup:
	npm install -g expo-cli
	npm install -g eas-cli
	npm install -g localtunnel
	${IN_MOBILE_DIR} cp .env.example .env
# .env内のLOCAL_TUNNEL_SUBDOMAINを書き換える
	${IN_MOBILE_DIR} npm install
# joetsumapデータベースを作成する

# work commands
start:
# mysql start
	${IN_BACKEND_DIR} start gradlew -t classes
	${IN_BACKEND_DIR} start gradlew bootRun
	${IN_MOBILE_DIR} start npx expo start

start-tunnel:
# mysql start
	${IN_BACKEND_DIR} start gradlew -t classes
	${IN_BACKEND_DIR} start gradlew bootRun
	${IN_MOBILE_DIR} start npx expo start --tunnel
# 直接実行すると動かないのでコマンドを挟む
	break && start lt --port 8080 --subdomain ${LOCAL_TUNNEL_SUBDOMAIN}
