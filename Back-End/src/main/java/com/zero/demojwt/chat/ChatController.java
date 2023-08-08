package com.zero.demojwt.chat;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.zero.demojwt.chat.repository.ChatDAO;
import com.zero.demojwt.chat.repository.MessageDAO;

import com.zero.demojwt.chat.model.ChatEntity;
import com.zero.demojwt.chat.model.MessageEntity;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {

	@Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatDAO chatDAO;

    @Autowired
    private MessageDAO messageDAO;

    @MessageMapping("/chat/{to}")
    public void sendMessage(@DestinationVariable String to, MessageEntity message) {
        System.out.println("handling send message: " + message + " to: " + to);
        ChatEntity chat = createAndOrGetChat(to);
        message.setChat(chat);
        message.setT_stamp(generateTimeStamp());
        message = messageDAO.save(message);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
    }

    @PostMapping("/getChats")
    public List<ChatEntity> getChats(@RequestBody String user) {
        return chatDAO.findByParticipant(user);
    }

    @PostMapping("/getMessages")
    public List<MessageEntity> getMessages(@RequestBody String chat) {
        ChatEntity ce = chatDAO.findByName(chat);

        if (ce != null) {
            return messageDAO.findAllByChat_id(ce.getId());
        } else {
            return new ArrayList<MessageEntity>();
        }
    }

    private ChatEntity createAndOrGetChat(String name) {
        ChatEntity ce = chatDAO.findByName(name);

        if (ce != null) {
            return ce;
        } else {
            ChatEntity newChat = new ChatEntity(name);
            return chatDAO.save(newChat);
        }
    }

    
    private String generateTimeStamp() {
		Instant i = Instant.now();
		String date = i.toString();
		System.out.println("Source: " + i.toString());
		int endRange = date.indexOf('T');
		date = date.substring(0, endRange);
		date = date.replace('-', '/');
		System.out.println("Date extracted: " + date);
		String time = Integer.toString(i.atZone(ZoneOffset.UTC).getHour() + 1);
		time += ":";

		int minutes = i.atZone(ZoneOffset.UTC).getMinute();
		if (minutes > 9) {
			time += Integer.toString(minutes);
		} else {
			time += "0" + Integer.toString(minutes);
		}

		System.out.println("Time extracted: " + time);
		String timeStamp = date + "-" + time;
		return timeStamp;
	}
}