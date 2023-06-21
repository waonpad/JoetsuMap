MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
MAKEFILE_DIR_ABS:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))

BACKEND_DIR := ${MAKEFILE_DIR_ABS}backend
MOBILE_DIR := ${MAKEFILE_DIR}frontend/mobile

include ${MOBILE_DIR}/.env

IN_BACKEND_DIR := cd ${BACKEND_DIR} &&
IN_MOBILE_DIR := cd ${MOBILE_DIR} &&

RUN_TERMINAL := ./run-terminal.sh

# setup commands
setup:
	npm install -g expo-cli
	npm install -g eas-cli
	npm install -g localtunnel
	${IN_MOBILE_DIR} cp .env.example .env
# .env内のLOCAL_TUNNEL_SUBDOMAINを書き換える
	${IN_MOBILE_DIR} npm install
# joetsumapデータベースを作成する
# 権限付与
	${IN_BACKEND_DIR} chmod +x gradlew
	${IN_BACKEND_DIR} chmod +x run-terminal.sh
	${IN_MOBILE_DIR} chmod +x run-terminal.sh

# work commands
start:
# mysql start
	${IN_BACKEND_DIR} ${RUN_TERMINAL} ./gradlew -t classes
	${IN_BACKEND_DIR} ${RUN_TERMINAL} ./gradlew bootRun
	${IN_MOBILE_DIR} ${RUN_TERMINAL} npx expo start

start-tunnel:
# mysql start
	${IN_BACKEND_DIR} ${RUN_TERMINAL} ./gradlew -t classes
	${IN_BACKEND_DIR} ${RUN_TERMINAL} ./gradlew bootRun
	${IN_MOBILE_DIR} ${RUN_TERMINAL} npx expo start --tunnel
	${RUN_TERMINAL} lt --port 8080 --subdomain ${LOCAL_TUNNEL_SUBDOMAIN}

mobile-build-previewAndroid:
	${IN_MOBILE_DIR} ${RUN_TERMINAL} eas secret:push --scope project --env-file .env --force
	${IN_MOBILE_DIR} ${RUN_TERMINAL} eas build --platform android --profile previewAndroid