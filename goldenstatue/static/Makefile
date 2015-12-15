start:
	echo nothing!
watch:
	node src/server-bridge.js
release:
	-rm -rf src2 build2
	babel src --out-dir src2
	NODE_ENV=production webpack --progress --color
	imagemin --optimizationLevel 7 --progressive src/public build2
	-rm -rf build
	mv build2 build
	-rm -rf build2
	$(MAKE) restart
stop:
	sudo supervisorctl stop goldenstatue_static
restart:
	sudo supervisorctl restart goldenstatue_static
	tail -f $(shell pwd)/../data/log/static-std.log
backwatch:
	webpack --config webpack.back.config.js --progress --color --watch
backrelease:
	NODE_ENV=production webpack --config webpack.back.config.js --progress --color
