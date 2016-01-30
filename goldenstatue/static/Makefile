start:
	echo nothing!
watch:
	-pkill -9 node
	-mkdir src2 build
	cp -r src/public/* build/
	babel src --out-dir src2 --watch &
	webpack --progress --color --watch &
	node src2/server.js
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
