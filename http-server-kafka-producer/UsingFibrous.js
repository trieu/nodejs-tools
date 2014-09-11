/**
 * Created by trieunt on 11/09/2014.
 */

var fibrous = require('fibrous');
var fs = require('fs');

var test = fibrous(function () {
    var data = fs.sync.readFile('/home/trieunt/data/user-income.txt');
    var rows = data.toString().split('\n');
    var n = rows.length;
    var lim = 10;
    for(var i=0; i< n; i++){
        console.log(rows[i]);
        if(i>=lim){
            break;
        }
    }
    console.log('2');
});

function runTest() {
    console.log('1');
    test.sync();
    console.log('3');
}

fibrous.run(runTest);