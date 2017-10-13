
/**
 * handdle error
 * @param err
 * @param msg
 */

exports.errorHandle = function(err, type){
    const time = new Date();
    console.log(`------------------------\n
                 time: ${time}\n
                 type: ${type}\n
                 ------------------------\n
                `);
}

module.exports = exports;