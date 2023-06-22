import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async () => {
    const scanParams = {
        TableName: 'Building' // Specify the table name
    };

    try {

        const scanResult = await dynamodb.scan(scanParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(scanResult.Items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed to retrieve person(s) from DynamoDB'})
        };
    }
};
