# Team member
* Chen Qiu  qiu.che@husky.neu.edu
* Xinglong Jia  jia.xi@husky.neu.edu
* Zenan Chen  chen.zena@husky.neu.edu

Application stack: MySQL--Linux--Node.js(koa)-Vue.js

This web application is a seperation of back-end and front-end and use axios to send data, it basiclly contains three parts: server, client, admin.

MySQL port is default 3306.

Server: server side as RESTful architectural style, responsible for communication with client/admin side. Used JWT achieves authentication system. It is listening at http://localhost:3000/

start server as dev: npm run dev-server   ## Attention, you must run server first, then run client or admin


Client: show the front-end, It is listening at http://localhost:8080/(only admin and server running) or 8081(admin, client, server all running), 

start client as dev: npm run dev-client


Admin: application management, provides sign in/sign up modules, It is listening at http://localhost:8080/ or 8081(same as above situations)

start admin as dev: npm run dev-admin



