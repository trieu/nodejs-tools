/**
 * Created by trieu on 9/21/14.
 */
var RedisDump = require('node-redis-dump'),
    dump = new RedisDump({
        host: '10.254.53.247',
        port: 6486,
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
        //console.log(data);

        var fs = require('fs');
        var path = "/home/trieunt/data/redis-247-6486-dump.txt";
        fs.writeFile(path, data, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The data was saved at "+path);
            }
        });

        console.log('--------- /REDIS DUMP ----------');
    }
});