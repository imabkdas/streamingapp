package com.streaming.backend.WebSocketConfig;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle incoming messages
        String clientMessage = message.getPayload();
        System.out.println("Received message: " + clientMessage);

        // Send a response back to the client
        String response = "Echo: " + clientMessage;
        session.sendMessage(new TextMessage(response));
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Called when a new WebSocket connection is established
        System.out.println("New connection established: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Called when the WebSocket connection is closed
        System.out.println("Connection closed: " + session.getId());
    }

}
