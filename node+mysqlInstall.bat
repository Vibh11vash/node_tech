curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"
sudo yum update -y
sudo yum install -y httpd24 php72 mysql57-server php72-mysqlnd
cat /etc/system-release
sudo service httpd start
sudo chkconfig httpd on
chkconfig --list httpd