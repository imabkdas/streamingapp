package com.streaming.backend;


import lombok.Getter;
import lombok.Setter;


public class MessagePayload {
    private String groupId;
    private String message;
    private String username;
    private String uuid;

    public String getUsername() {
        return username;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
