const DynamoBase = require("./DynamoBase");

class Subscriptions extends DynamoBase{

    constructor() {
        super();
        this.TableName = 'subscriptions';
    }
  
    create(data = {}) {
        const params = {
            TableName: this.table,
            Item: {
                ...data
            },
            ReturnValues: "NONE"
        };

        console.log("Adding a new item...", params);
        return new Promise((resolve, reject) => {
            try {
                super.save(super.removeEmptyStringElements(params)).then(result => {
                    resolve(result);
                }).catch(errorSave => {
                    reject(errorSave);
                });
            } catch (AmazonServiceError) {
                reject(AmazonServiceError);
            }
        })
    }

}

module.exports = Subscriptions;