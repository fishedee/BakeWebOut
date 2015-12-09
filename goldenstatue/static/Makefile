start:
	echo nothing!
watch:
	node src/server-bridge.js
release:
	-rm -rf src2 build2
	babel src --out-dir src2
	NODE_ENV=production webpack --progress --color
	cp -r src/public/* build2
	-rm -rf build
	mv build2 build
	-rm -rf build2
	$(MAKE) restart
stop:
	-forever stop src2/server.js
restart:stop
	NODE_ENV=production forever start -a -l $(shell pwd)/../data/nodelog/server.log src2/server.js
	tail -f $(shell pwd)/../data/nodelog/server.log
backwatch:
	webpack --config webpack.back.config.js --progress --color --watch
backrelease:
	NODE_ENV=production webpack --config webpack.back.config.js --progress --color
