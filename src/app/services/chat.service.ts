import { BehaviorSubject, Observable } from 'rxjs';
import { Chat, Message, User } from '../models/types';
import { Injectable } from '@angular/core';
import { CHAT_DATA } from '../data/chat-data';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly DEFAULT_USER: User = {
    name: 'User123',
    status: 'online',
  };

  private readonly scrollToBottom = new BehaviorSubject<boolean>(false);
  private readonly isTyping = new BehaviorSubject<boolean>(false);
  private readonly showEmojiPicker = new BehaviorSubject<boolean>(false);
  private readonly chats = new BehaviorSubject<Chat[]>(CHAT_DATA);
  private readonly activeChat = new BehaviorSubject<Chat>(CHAT_DATA[0]);
  private readonly user = new BehaviorSubject<User>(this.DEFAULT_USER);
  private readonly pinnedMessage = new BehaviorSubject<Message | null>(null);

  getScrollToBottom(): Observable<boolean> {
    return this.scrollToBottom.asObservable();
  }

  triggerScroll(): void {
    this.scrollToBottom.next(true);
    setTimeout(() => this.scrollToBottom.next(false), 100);
  }

  getShowEmojiPicker(): Observable<boolean> {
    return this.showEmojiPicker.asObservable();
  }

  triggerEmojiPicker(): void {
    this.showEmojiPicker.next(true);
    setTimeout(() => this.showEmojiPicker.next(false), 100);
  }

  getChats(): Observable<Chat[]> {
    return this.chats.asObservable();
  }

  getActiveChat(): Observable<Chat> {
    return this.activeChat.asObservable();
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  getPinnedMessage(): Observable<Message | null> {
    return this.pinnedMessage.asObservable();
  }

  getIsTyping(): Observable<boolean> {
    return this.isTyping.asObservable();
  }

  setTyping(typing: boolean): void {
    this.isTyping.next(typing);
  }

  changeChat(chat: Chat): void {
    this.pinnedMessage.next(null);
    const updatedChats = this.chats.value.map(c => ({
      ...c,
      unread: c.id === chat.id ? 0 : c.unread,
    }));

    this.chats.next(updatedChats);
    this.activeChat.next(updatedChats.find(c => c.id === chat.id)!);
  }

  deleteMessage(messageId: number): void {
    if (this.pinnedMessage.value?.id === messageId) {
      this.pinnedMessage.next(null);
    }

    const updatedChats = this.chats.value.map(chat => {
      if (chat.id === this.activeChat.value.id) {
        return {
          ...chat,
          messages: chat.messages.filter(msg => msg.id !== messageId)
        };
      }
      return chat;
    });

    this.chats.next(updatedChats);
    this.activeChat.next(updatedChats.find(chat => chat.id === this.activeChat.value.id)!);
  }

  togglePinMessage(): void {
    const message = this.pinnedMessage.value;
    if (message) {
      this.pinnedMessage.next(
        this.pinnedMessage.value?.id === message.id ? null : message
      );
    }
  }

  async simulateResponse(isImage: boolean = false): Promise<void> {
    this.setTyping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.setTyping(false);

    const currentChat = this.activeChat.value;
    const responseList = isImage ?
      currentChat.responses.image || currentChat.responses.default :
      currentChat.responses.default;

    const response = responseList[Math.floor(Math.random() * responseList.length)];

    const newMessage: Message = {
      id: Date.now(),
      text: response,
      timestamp: new Date(),
      userId: 'Bot',
    };

    this.updateActiveChat(newMessage);
  }

  updateActiveChat(newMessage: Message): void {
    const updatedChats = this.chats.value.map(chat => {
      if (chat.id === this.activeChat.value.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    });

    this.chats.next(updatedChats);
    this.activeChat.next(updatedChats.find(chat => chat.id === this.activeChat.value.id)!);
    this.triggerScroll();
  }

  addMessage(text: string): void {
    const newMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      timestamp: new Date(),
      userId: this.user.value.name
    };

    this.updateActiveChat(newMessage);

    const isImage = text.includes('<svg');
    this.simulateResponse(isImage).finally();
  }

  startSpamBot() {
    const spamBotId = 4;

    const sendRandomMessage = async () => {
      const botChat = this.chats.value.find(chat => chat.id === spamBotId);
      if (!botChat) return;

      if (this.activeChat.value.id === spamBotId) {
        this.setTyping(true);
        this.triggerScroll();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
        this.setTyping(false);
      }

      const responses = botChat.responses.default;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const newMessage: Message = {
        id: Date.now(),
        text: randomResponse,
        timestamp: new Date(),
        userId: 'Bot',
      };

      const updatedChats = this.chats.value.map(chat => {
        if (chat.id === spamBotId) {
          return {
            ...chat,
            unread: chat.id !== this.activeChat.value.id ? chat.unread + 1 : chat.unread,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      });

      this.chats.next(updatedChats);

      if (this.activeChat.value.id === spamBotId) {
        this.activeChat.next(updatedChats.find(chat => chat.id === spamBotId)!);
        this.triggerScroll();
      }

      const MIN_DELAY = 0;
      const MAX_DELAY = 10;

      const getRandomDelay = () => {
        const randomSeconds = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);
        return randomSeconds * 1000;
      };

      const nextMessageDelay = getRandomDelay();
      setTimeout(sendRandomMessage, nextMessageDelay);
    };

    sendRandomMessage().finally();
  }
}
