import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IconsComponent } from '../icons/icons.component';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/types';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [AsyncPipe, IconComponent, FormsModule],
  templateUrl: 'chat-list.component.html',
})
export class ChatListComponent {
  private readonly chatService = inject(ChatService);

  chats$ = this.chatService.getChats();
  activeChat$ = this.chatService.getActiveChat();
  icons = IconsComponent;
  searchQuery = '';

  filteredChats$ = this.chats$.pipe(
    map(chats => this.filterChats(chats))
  );

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filteredChats$ = this.chats$.pipe(
      map(chats => this.filterChats(chats))
    );
  }

  filterChats(chats: Chat[]): Chat[] {
    if (!this.searchQuery) return chats;

    const searchLower = this.searchQuery.toLowerCase();
    return chats.filter(chat =>
      chat.name.toLowerCase().includes(searchLower) ||
      chat.description.toLowerCase().includes(searchLower)
    );
  }

  highlightMatch(text: string): string {
    if (!this.searchQuery) return text;

    const searchLower = this.searchQuery.toLowerCase();
    const textLower = text.toLowerCase();
    const index = textLower.indexOf(searchLower);

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + this.searchQuery.length);
    const after = text.slice(index + this.searchQuery.length);

    return `${before}<span class="bg-blue-500/30">${match}</span>${after}`;
  }

  onChatSelect(chat: Chat): void {
    this.chatService.changeChat(chat);
    this.searchQuery = '';
    this.onSearchChange('');
  }
}
