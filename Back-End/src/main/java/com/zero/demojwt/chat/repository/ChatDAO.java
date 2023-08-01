package com.zero.demojwt.chat.repository;

import com.zero.demojwt.chat.model.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface ChatDAO extends JpaRepository<ChatEntity, Long> {
    // Método para encontrar un chat por el nombre del participante
    ChatEntity findByName(String name);
    
     // Método para encontrar chats por el nombre del participante
     @Query("SELECT c FROM Chat c WHERE c.name = :participant")
     List<ChatEntity> findByParticipant(String participant);
}

