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

}

module.exports = DynamoBase;