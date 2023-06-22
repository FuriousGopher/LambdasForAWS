import {randomUUID} from 'crypto';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const {name, surname} = event;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US");
    const id = randomUUID();

    if (!isValidName(name) || !isValidName(surname)) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'Invalid name or surname'})
        };
    }

    const person = {
        id,
        name,
        surname,
        createdAt: formattedDate
    };

    const params = {
        TableName: 'Building',
        Item: person
    };

    try {
        await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(person)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed to save person to DynamoDB'})
        };
    }
};

function isValidName(value) {
    const regex = /^[A-Za-z]+$/;
    return regex.test(value);
}
