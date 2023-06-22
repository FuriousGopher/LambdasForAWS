import AWS from 'aws-sdk';


const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const {id, name, surname} = event;


    const params = {
        TableName: 'Building',
        Key: {id},
        UpdateExpression: 'SET #n = :name, #s = :surname',
        ExpressionAttributeNames: {
            '#n': 'name',
            '#s': 'surname'
        },
        ExpressionAttributeValues: {
            ':name': name,
            ':surname': surname
        }
    };

    try {

        await dynamodb.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Person updated successfully'})
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed to update person in DynamoDB'})
        };
    }
};
