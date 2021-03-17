#!/bin/bash

cd frontend ; sudo yarn install ; sudo yarn build ; sudo rm -rf ../public ; sudo cp -r public/ ../

cd ..
cd test_conf
sudo mysql < testdb.sql
sudo cp ./.htconf ../
sudo cp ./testsite.conf /etc/apache2/sites-available
sudo apache2ctl restart
