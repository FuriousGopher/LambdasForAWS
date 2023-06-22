import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const  id  = event.pathParameters.proxy;


    const params = {
        TableName: 'Building',
        Key: { id: id }
    };

    try {

        const result = await dynamodb.get(params).promise();


        if (result.Item) {
            return {
                statusCode: 200,
                body: JSON.stringify(result.Item)
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Person not found' })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve person from DynamoDB' })
        };
    }
};