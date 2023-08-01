package com.zero.demojwt.chat.repository;

import com.zero.demojwt.chat.model.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface MessageDAO extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findAllByChat_id(Long chatId);
}