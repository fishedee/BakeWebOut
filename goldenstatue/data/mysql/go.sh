#!/bin/sh
mysql -uroot -p < GoldenStatue.sql
redis-cli flushall
redis-cli keys "*"