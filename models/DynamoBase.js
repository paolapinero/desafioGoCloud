const AWS = require('aws-sdk');

class DynamoBase {

    constructor(region = "us-west-2") {
        this.AWS = AWS;
        let DYNAMO_CONF = {
            region: region,
        };
        this.docClient = new AWS.DynamoDB.DocumentClient(DYNAMO_CONF);
    }

    save(params) {
        return new Promise((resolve, reject) => {
            this.docClient.put(params, function (err, data) {
                if (err) {
                     console.log(err);
                    reject(err)
                } else {
                     console.log("Success", data);
                    resolve(data);
                }
            });
        });
    }

    removeEmptyStringElements(obj) {
        for (var prop in obj) {
            if (typeof obj[prop] === 'object') {// dive deeper in
                this.removeEmptyStringElements(obj[prop]);
            } else if (obj[prop] === '') {// delete elements that are empty strings
                delete obj[prop];
            }
        }
        return obj;
      }

}

module.exports = DynamoBase;