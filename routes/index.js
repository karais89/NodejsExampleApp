'use strict'

const express = require('express');
var router = express.Router();

const redis = require('redis');

console.log(`${process.env.REDIS_PORT_6379_TCP_ADDR}:${process.env.REDIS_PORT_6379_TCP_PORT}`);

//여기서 사용된 redis는 Docker에서 redis란 이름으로 연결되는 컨테이너를 뜻한다. 곧 host주소이다.
let client = redis.createClient('6379', 'redis');

/* GET home page. */
router.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    res.render('index', { title: 'ACS' , message:`This page has been viewed ${counter} times!`});
  });
});

module.exports = router;
