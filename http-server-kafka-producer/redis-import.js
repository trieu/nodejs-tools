/**
 * Created by trieu on 9/21/14.
 */



var fibrous = require('fibrous');
var fs = require('fs');
var readFile = fibrous(function () {
    var path = "/home/trieunt/data/redis-247-6486-dump.txt";
    return fs.sync.readFile(path);
});

function runImportData() {
    console.log('BEGIN runImportData');

    var data = readFile.sync();
    console.log('data : ' + data);

    var RedisDump = require('node-redis-dump'),
        dump = new RedisDump({
            host: 'localhost',
            port: 6379
        });
    dump.connect();
    dump.import({
        type: 'redis',
        db: 0,
        data: data,
        clear: false,
        callback: function (err, report) {
            'use strict';

            if (err) {
                console.log('Could\'t not import redis data!', err);
                return;
            }

            console.log('Report:', report);
        }
    });

    console.log('END runImportData');
}

fibrous.run(runImportData);

