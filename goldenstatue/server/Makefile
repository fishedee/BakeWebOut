watch:
	-pkill -9 bee
	-pkill -9 goldenstatue
	nohup bee run &
	tail -f nohup.out
release:
	go install goldenstatue
	pkill -9 goldenstatue
	nohup goldenstatue &
	tail -f nohup.out
