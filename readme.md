# Long Polling Example with Express

This project demonstrates a simple long-polling server implementation using Node.js and Express. Long polling allows the server to keep a connection open until there is new data to send, enabling near real-time communication between client and server.

## Project Structure

- **server.js**: The main server file implementing long-polling functionality.

## How It Works

- The server listens for GET requests on the `/date` endpoint.
- Instead of responding immediately, the server holds the request open and waits for new data to send.
- Periodically, the server pushes data (like a tick count) to the client, simulating updates.
- After a limit (defined by the `LIMIT` constant), the server closes the connection by sending an "END" message.

## Code Explanation

### Dependencies

The project uses `express`, a minimal web framework for Node.js.

### Server Logic

1. **Holding Client Connections**:
   The server listens on the `/date` endpoint. When a request is received, it doesn't respond immediately. Instead, it stores the client's response object in an array (`connections`), keeping the connection open.

2. **Sending Data Periodically**:
   Every second (as defined by `DELAY`), the server sends a message to all connected clients, showing a "tick" count. This simulates real-time updates to the client. So whatever is the timeout defined, server keeps the connection open till then.

3. **Closing Connections**:
   After a certain number of ticks (defined by `LIMIT`), the server sends an "END" message and closes the connection for all clients.

### Key Variables:
- **`connections`**: Array that stores the active client connections.
- **`tick`**: Counter to simulate a timer or heartbeat.
- **`LIMIT`**: Maximum number of ticks before the server ends the connection.
- **`DELAY`**: Interval between sending tick messages.

## Running the Server

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed, then run:
   ```bash
   npm install express
   ```

3. **Run the server**:
   Start the server by running:
   ```bash
   node server.js
   ```
   The server will start listening on `http://localhost:3000`.

4. **Testing the Long Polling**:
   - You can test the long polling by making GET requests to `http://localhost:3000/date`.
   - Open multiple connections (clients) to the `/date` endpoint using `curl` or a browser, and you will see periodic updates pushed to each client.

   Example command to simulate a client using `curl`:
   ```bash
   curl http://localhost:3000/date
   ```