import dotenv from "dotenv"
dotenv.config()


import Redis from 'ioredis'


// Create a Redis instance for subscribing
const subscriber = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PWD,
    username: process.env.REDIS_USER,
    tls: {}
});




// Create a Redis instance for publishing
const publisher = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PWD,
    username: process.env.REDIS_USER,
    tls: {}
});



export function subscribe(channel, callback) {
    subscriber.subscribe(channel, (err, count) => {
        if (err) {
            console.error('Error subscribing to channel:', err);
            return;
        }
        console.log(`Subscribed to ${channel}`);
    });

    subscriber.on('message', (subscribedChannel, message) => {
        console.log('Subscriber ', subscribedChannel, ' has received from redis msg ', message);
        if (subscribedChannel === channel) {
            callback(message);
        }
    });
}


// Function to publish a message to a Redis channel
export async function publish(channel, message) {
    try {
        await publisher.publish(channel, message);
        console.log(`Published message to ${channel}: ${message}`);
    } catch (error) {
        console.error('Error publishing message:', error);
    }
}