import AWS from 'aws-sdk';


const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const {id} = event;


    const params = {
        TableName: 'Building',
        Key: {id}
    };

    try {

        await dynamodb.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Person deleted successfully'})
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed to delete person from DynamoDB'})
        };
    }
};
