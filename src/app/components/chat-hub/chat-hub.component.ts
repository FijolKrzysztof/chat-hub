import { Component, ElementRef, inject, OnInit, signal, Signal, viewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../message/message.component';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { IconComponent } from '../icon/icon.component';
import { IconsComponent } from '../icons/icons.component';
import { ChatService } from '../../services/chat.service';
import { TypingIndicatorComponent } from '../typing-indicator/typing-indicator.component';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-hub',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MessageComponent,
    ChatListComponent,
    IconComponent,
    TypingIndicatorComponent,
    EmojiPickerComponent
  ],
  templateUrl: 'chat-hub.component.html',
})
export class ChatHubComponent implements OnInit {
  readonly chatService = inject(ChatService);

  messagesEnd: Signal<ElementRef | undefined> = viewChild('messagesEnd');
  messageInput: Signal<ElementRef | undefined> = viewChild('messageInput');

  user$ = this.chatService.getUser();
  activeChat$ = this.chatService.getActiveChat();
  pinnedMessage$ = this.chatService.getPinnedMessage();
  isTyping$ = this.chatService.getIsTyping();
  message = '';
  showSidebar = signal(false);
  emojiPickerVisible = signal(false);

  readonly Icons = IconsComponent;

  ngOnInit() {
    this.chatService.getScrollToBottom().pipe(
      takeUntilDestroyed(),
    ).subscribe(shouldScroll => {
      if (shouldScroll) {
        this.scrollToBottom();
      }
    });
  }

  toggleSidebar(): void {
    this.showSidebar.update(v => !v);
  }

  onEmojiSelect(emoji: string) {
    const inputElement = this.messageInput()?.nativeElement;
    if (inputElement) {
      const cursorPosition = inputElement.selectionStart;
      const textBeforeCursor = this.message.slice(0, cursorPosition);
      const textAfterCursor = this.message.slice(cursorPosition);

      this.message = textBeforeCursor + emoji + textAfterCursor;

      setTimeout(() => {
        const newPosition = cursorPosition + emoji.length;
        inputElement.setSelectionRange(newPosition, newPosition);
        inputElement.focus();
      });
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.messagesEnd()?.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        });
      } catch (err) {
      }
    }, 10)
  }

  unpinMessage(): void {
    this.chatService.togglePinMessage();
  }

  addImage(): void {
    this.chatService.addMessage(this.Icons.placeholderImage);
  }

  handleSubmit(): void {
    if (this.message.trim()) {
      this.chatService.addMessage(this.message);
      this.message = '';
      this.messageInput()?.nativeElement.focus();
    }
  }
}
