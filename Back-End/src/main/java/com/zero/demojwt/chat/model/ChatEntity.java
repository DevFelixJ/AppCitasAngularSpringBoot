package com.zero.demojwt.chat.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity(name="Chat")
@Table(name = "CHATS")
public class ChatEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;
	
	@Column(name = "name")
	private String name;
	
	
	public ChatEntity() {}

	public ChatEntity(String name) {
		this.name = name;
	}

	public long getId() {
		return id;
	}

	public void setId(long chat_id) {
		this.id = chat_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}