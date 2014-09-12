/**
 * Created by trieunt on 12/09/2014.
 */

var zkKafka = 'localhost:2181';
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(zkKafka),
    consumer = new Consumer(
        client,
        [
            { topic: 'user-activity', partition: 0  },
            { topic: 'user-activity', partition: 1 , offset: 170078  }
        ],
        {
            autoCommit: false, fromOffset: true
        }
    );

consumer.on('message', function (message) {
    var offset = {
        topic : message.topic, partition : message.partition, offset : message.offset
    };
    console.log(offset);
    console.log(message.value.split('\t'));
});