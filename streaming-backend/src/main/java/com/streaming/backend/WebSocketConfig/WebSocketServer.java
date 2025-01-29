package com.streaming.backend.WebSocketConfig;

import com.corundumstudio.socketio.SocketIOServer;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class WebSocketServer implements CommandLineRunner {

    @Autowired
    public SocketIOServer socketIOServer;

    @Override
    public void run(String... args) throws Exception {
        socketIOServer.start(); // Start the Socket.IO server
        System.out.println("Socket.IO server started on port 8080");
    }

    @PreDestroy
    public void stopServer() {
        socketIOServer.stop(); // Stop the Socket.IO server gracefully
        System.out.println("Socket.IO server stopped");
    }
}
