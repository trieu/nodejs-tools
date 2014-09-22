/**
 * Created by trieu on 9/21/14.
 */
var RedisDump = require('node-redis-dump'),
    dump = new RedisDump({
        host: 'localhost',
        port: 6379,
        password: ''
    });

dump.connect();
dump.export({
    type: 'redis',
    //isCompress: false, (not working now)
    callback: function(err, data) {
        if (err) {
            console.log('Could\'t not make redis dump!', err);
            return;
        }

        console.log('--------- REDIS DUMP ----------');
        console.log(data);
        console.log('--------- /REDIS DUMP ----------');
    }
});