package com.example.app.config;

import com.example.app.chat.MessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashSet;
import java.util.Set;


@Slf4j

public class ChatHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Set<WebSocketSession> sessions = new HashSet<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("User Connected");
        sessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        MessageDTO chat = objectMapper.readValue(payload,MessageDTO.class);
        String type = chat.getType();
        if(type.equals("JOIN"))
            chat.setContent("Connected to the Chat Room");
        if(type.equals("LEAVE"))
            chat.setContent("Left the Chat Room");
        for (WebSocketSession s : sessions) {
            s.sendMessage(new TextMessage(objectMapper.writeValueAsString(chat)));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("User Disconnected");
        sessions.remove(session);
    }
}
