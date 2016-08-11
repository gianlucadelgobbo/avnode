AVnode
=============

[![Join the chat at https://gitter.im/gianlucadelgobbo/avnode](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gianlucadelgobbo/avnode?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[AVnode](https://github.com/gianlucadelgobbo/avnode) is a try to have the FLxER website based on [MongoDB](http://www.mongodb.org/) and [NodeJS](http://nodejs.org/).

Authors: [Gianluca Del Gobbo](https://github.com/gianlucadelgobbo/)

Requirements
------------

* NodeJS http://nodejs.org/
* MongoDB http://www.mongodb.org/


Setup
-----

1. Copy the config file `config/default.json` to `config/local.json` and configure your settings
2. Restore the DB using `AVnodeDB.zip` [mongorestore](http://docs.mongodb.org/manual/reference/program/mongorestore/) with `mongorestore --drop -d avnode <directory-of-dumped-backup>`
3. Request the file repository `/warehouse` to g.delgobbo@flyer.it (you don't need it to let the app starts)
4. Run `npm install && bower install`
4. Run `npm start`
5. Login with your FLxER user or use user: GianlucaDelGobbo password: GianlucaDelGobbo


Contributing
------------

Want to contribute? Great!!!


### Commands

1. Fork it.
2. Create a branch (`git checkout -b my_markup`)
3. Commit your changes (`git commit -am "Added Snarkdown"`)
4. Push to the branch (`git push origin my_markup`)
5. Open a [Pull Request](https://github.com/gianlucadelgobbo/avnode)
