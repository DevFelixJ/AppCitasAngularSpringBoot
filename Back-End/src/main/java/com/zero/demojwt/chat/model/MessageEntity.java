package com.zero.demojwt.chat.model;

import jakarta.persistence.*;

@Entity(name="Message")
@Table(name = "MESSAGES")
public class MessageEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;
	
	@ManyToOne
	@JoinColumn(name = "chat.id")
	private ChatEntity chat;
	
	@Column(name = "sender")
	private String sender;
	
	@Column(name = "t_stamp")
	private String t_stamp;
	
	@Column(name = "content")
	private String content;
	
	public MessageEntity() {}

	public MessageEntity(String sender, String t_stamp, String content, ChatEntity chat) {
		this.sender = sender;
		this.t_stamp = t_stamp;
		this.content = content;
		this.chat = chat;
	}

	public long getId() {
		return id;
	}

	public void setId(long ms_id) {
		this.id = ms_id;
	}

	public ChatEntity getChat() {
		return chat;
	}

	public void setChat(ChatEntity chat) {
		this.chat = chat;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getT_stamp() {
		return t_stamp;
	}

	public void setT_stamp(String t_stamp) {
		this.t_stamp = t_stamp;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}