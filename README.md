# Scalable Chat System

## About: (Demo video: https://youtu.be/feWuDSC9Ekc?si=tzkeBGrJsZZtGyQy)
This project involves the high-level implementation of a chat system similar to WhatsApp. The following services have been implemented:

1. **Auth Service**: Using JWT for authentication. (Link : https://github.com/MahmmadhusenDodiya/auth-backend)
2. **Frontend with Next.js**: Provides the user interface and establishes a WebSocket connection with the backend service. (Link : https://github.com/MahmmadhusenDodiya/chat-app-fe)
3. **Backend Service**: Receives messages from the frontend, stores messages in the database, and publishes messages to Kafka. (Link : This Repo)
4. **API Gateway**: Acts as a gateway for all APIs in the system. (Link : https://github.com/MahmmadhusenDodiya/api-gateway-chat)

## Technology Stack:
- **Database**: MongoDB to store usernames and chats.
- **Kafka**: To handle messages from different clients.

## Login Flow:
1. The user enters credentials in the Next.js client.
2. An authentication request is sent to the auth server.
3. The auth server validates the credentials and sets a JWT token in the cookies, which is used for further requests.

## Message Flow:
1. The user sends a message, which is transmitted to the backend server via the WebSocket connection.
2. The server checks if the recipient is connected to the same backend server:
   - If connected, the message is sent back to that WebSocket.
   - If not connected, the server publishes the message to Kafka for that particular message.
3. The server saves the message in the database.
4. Server subscribe to the message channel of all the users that are connected that server to receive message data from other backend servers.



![alt text](<Chat Application.png>)
