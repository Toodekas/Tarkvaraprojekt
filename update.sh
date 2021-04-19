#!/bin/bash

cd frontend ; sudo yarn install ; sudo yarn build ; sudo rm -rf ../public ; sudo cp -r public/ ../

cd ..
cd test_conf
sudo mysql < testdb.sql

sudo apache2ctl restart
