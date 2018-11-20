#!/bin/bash

sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y mysql-server
sudo mysql < testdb.sql
echo "CREATE USER 'db_user'@'localhost' IDENTIFIED BY 'db_pass';" | sudo mysql;
echo "GRANT ALL PRIVILEGES ON test.* TO 'db_user'@'localhost';" | sudo mysql;
sudo cp ./.htconf ../
#gpg --recv-keys 5072E1F5
#sudo bash -c "gpg --export 5072E1F5 > /etc/apt/trusted.gpg.d/5072E1F5.gpg"
#sudo bash -c  "echo deb http://repo.mysql.com/apt/ubuntu/ vivid mysql-5.7 > /etc/apt/sources.list.d/mysql.list"
sudo apt-get install -y apache2
sudo apt-get install -y php7.2
#sudo apt-get install -y libapache2-mod-php7.2
sudo apt-get isntall -y php7.2-mysql
sudo apt-get install -y git
sudo apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get update && sudo apt-get install -y nodejs
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
cd /home && sudo git clone https://github.com/tarkvaraprojekt-2019/Tarkvaraprojekt.git
cd /home/Tarkvaraprojekt/frontend && sudo yarn install && sudo yarn build && sudo cp -r public/ ../
sudo cp /home/Tarkvaraprojekt/test_conf/testsite.conf /etc/apache2/sites-available
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod deflate
sudo a2dissite 000-default.conf
sudo a2ensite testsite.conf
sudo apache2ctl restart