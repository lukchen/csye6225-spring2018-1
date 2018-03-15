sudo apt-get install phpmyadmin php-mbstring php-gettext

$i++;
$cfg['Servers'][$i]['verbose'] = 'Database Server 2';
$cfg['Servers'][$i]['host'] = 'xxxxxxxxxxxx.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com';
$cfg['Servers'][$i]['port'] = '3306';
$cfg['Servers'][$i]['connect_type'] = 'tcp';
$cfg['Servers'][$i]['extension'] = 'mysql';
$cfg['Servers'][$i]['compress'] = TRUE;
$cfg['Servers'][$i]['auth_type'] = 'cookie';