import { Component, ElementRef, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { ActivatedRoute } from '@angular/router';

import { ChatService } from '../services/chat.service';
import { Message, User } from '../models/chat.model';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  url = 'ws://localhost:8080/chat'; // WebSocket URL
  otherUser?: User;
  thisUser: User = JSON.parse(sessionStorage.getItem('user')!);
  channelName?: string;
  webSocketSubject?: WebSocketSubject<any>;
  newMessage = new FormControl('');
  messagesSubject = new BehaviorSubject<Array<Message>>([]);

  messages$: Observable<Array<Message>> = this.messagesSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.chatService
      .getUserByNickname(this.route.snapshot.paramMap.get('user')!)
      .subscribe((data) => {
        this.otherUser = data;
        this.otherUser.propic = 'data:image/jpeg;base64,' + this.otherUser.propic;
        this.connectToChat();
        this.el.nativeElement.querySelector('#chat').scrollIntoView();
      });
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown() {
    const container = this.el.nativeElement.querySelector('#chat');
    container.scrollTop = container.scrollHeight;
  }

  connectToChat() {
    const id1 = this.thisUser.id!;
    const nick1 = this.thisUser.nickname;
    const id2 = this.otherUser?.id!;
    const nick2 = this.otherUser?.nickname!;

    if (id1 > id2) {
      this.channelName = nick1 + '&' + nick2;
    } else {
      this.channelName = nick2 + '&' + nick1;
    }
    this.loadChat();
    console.log('connecting to chat...');
    this.webSocketSubject = webSocket(this.url);

    this.webSocketSubject.subscribe(
      (response) => {
        if (response.channel === this.channelName) {
          this.loadChat();
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  sendMsg() {
    if (this.newMessage.value !== '') {
      const message = {
        channel: this.channelName,
        sender: this.thisUser.nickname,
        t_stamp: 'to be defined in server',
        content: this.newMessage.value,
      };

      this.webSocketSubject?.next(message);
      this.newMessage.setValue('');
    }
  }

  loadChat() {
    this.chatService.getMessages(this.channelName!).subscribe((data) => {
      let mgs: Array<Message> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id ? 1 : -1));
      this.messagesSubject.next(mgs);
    });
  }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return myTimeStamp.substring(0, endDate) + ' at ' + myTimeStamp.substring(endDate + 1);
  }
}
