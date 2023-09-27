# Sitemate challenge

## Starting the Server

1. **Install Dependencies**: 
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

2. **Start the Server**: 

   ```
   npm start
   ```

   or

   ```
   node server.js
   ```

3. **Confirm Server is Running**: 
   ```
   Server is running on port 3000
   ```

   This indicates that your server is running on port 3000.

## Client & CLI

The client can perform the following operations: create an issue, read issues, read an issue by ID, update an issue, and delete an issue. 

Here are examples of how to perform these operations in the client：


1. **Create an Issue:**
   ```bash
   node client.js create
   ```
2. **Read Issues:**
   ```bash
   node client.js read
   ```
3. **Read an Issue by ID:**
   ```bash
   node client.js readById <issue_id>
   ```
4. **Update an Issue:**
   ```bash
   node client.js update <issue_id>
   ```
5. **Delete an Issue:**
   ```bash
   node client.js delete <issue_id>
   ```

## Testing
### Client-Side Tests
To run client-side tests using Jest, open terminal and navigate to the test client directory:
 ```bash
    cd test 
    npx jest client.test.js
   ```
### Server-Side Tests
For server-side testing, I use Supertest to perform integration tests Express.js routes:
 ```bash
    cd test 
    npx jest server.test.js
   ```
 