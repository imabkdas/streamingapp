package com.streaming.backend.WebSocketConfig;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import com.streaming.backend.MessagePayload;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SocketIOEventHandler {

    private final Map<UUID, String> userMap = new HashMap<>(); // Store user IDs and names
    private final Map<String, Set<UUID>> groupMembers = new HashMap<>(); // Store group members

    @OnConnect
    public void onConnect(SocketIOClient client) {
        String groupId = client.getHandshakeData().getSingleUrlParam("groupId");
        String username = client.getHandshakeData().getSingleUrlParam("username");

        if (username == null || username.isEmpty()) {
            username = "Unknown";
        }

        userMap.put(client.getSessionId(), username);

        groupMembers.putIfAbsent(groupId, new HashSet<>());
        groupMembers.get(groupId).add(client.getSessionId());

        System.out.println("New connection: " + client.getSessionId() + " as " + username + " in group " + groupId);
    }

    @OnDisconnect
    public void onDisconnect(SocketIOClient client) {
        userMap.remove(client.getSessionId());
        groupMembers.values().forEach(members -> members.remove(client.getSessionId()));
        System.out.println("Connection closed: " + client.getSessionId());
    }

    @OnEvent("message")
    public void onMessage(SocketIOClient client, MessagePayload payload) {
        String message = payload.getMessage();
        String groupId = payload.getGroupId();
        String username = userMap.getOrDefault(client.getSessionId(), "Unknown");

        if (groupId == null || !groupMembers.containsKey(groupId)) {
            return;
        }

        // Add null checks for username and message
        if (username == null || message == null) {
            System.out.println("Username or message is null. Cannot send message.");
            return;
        }

        System.out.println("Received message from :" + username + ": " + message);

        // Broadcast the message to all members in the group
        for (UUID memberId : groupMembers.get(groupId)) {
            client.getNamespace().getClient(memberId).sendEvent("message", Map.of(
                    "username", username,
                    "text", message
            ));
        }
    }
}