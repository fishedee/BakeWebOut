watch:
	-pkill -9 bee
	-pkill -9 goldenstatue
	nohup bee run &
	tail -f nohup.out
release:
	go install goldenstatue
	rm -rf goldenstatue
	cp ${GOPATH}bin/goldenstatue .
	sudo supervisorctl restart goldenstatue_server
	tail -f ../data/log/server-std.log
stop:
	sudo supervisorctl stop goldenstatue_server 
	-pkill -9 bee
	-pkill -9 goldenstatue
