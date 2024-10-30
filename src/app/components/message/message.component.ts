import { Component, inject, input } from '@angular/core';
import { Message } from '../../models/types';
import { IconComponent } from '../icon/icon.component';
import { IconsComponent } from '../icons/icons.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [IconComponent, DatePipe],
  template: `
    <div [class]="'flex ' + (isOwnMessage() ? 'justify-end' : 'justify-start')">
      <div class="max-w-[85%] md:max-w-[80%] group">
        <div [class]="'flex items-center gap-2 mb-1 ' +
          (isOwnMessage() ? 'justify-end' : 'justify-start')">
          <span class="text-sm font-medium text-slate-300">{{ message().userId }}</span>
          <span class="text-xs text-slate-400">
            {{ message().timestamp | date:'shortTime' }}
          </span>
        </div>
        <div [class]="'p-3 rounded-lg shadow-md ' +
          (isOwnMessage() ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-100') + ' ' +
          (isPinned() ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-slate-800' : '')">
          <div class="break-words" [innerHTML]="sanitizedMessage"></div>
        </div>
        <div [class]="'flex gap-2 mt-1 ' +
          (isOwnMessage() ? 'justify-end' : 'justify-start')">
          <button
            (click)="handlePinMessage()"
            [class]="'p-1 transition-opacity ' +
              (isPinned() ? 'text-yellow-500' :
               'text-slate-400 hover:text-yellow-500 opacity-0 group-hover:opacity-100')">
            <app-icon [icon]="icons.pinIcon" className="w-4 h-4"/>
          </button>
          @if (isOwnMessage()) {
            <button
              (click)="handleDeleteMessage()"
              class="p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <app-icon [icon]="icons.trashIcon" className="w-4 h-4"/>
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class MessageComponent {
  readonly sanitizer = inject(DomSanitizer);
  readonly chatService = inject(ChatService);

  message = input.required<Message>();
  isOwnMessage = input.required<boolean>();
  isPinned = input.required<boolean>();

  icons = IconsComponent;

  get sanitizedMessage() {
    return this.sanitizer.bypassSecurityTrustHtml(this.message().text);
  }

  handlePinMessage(): void {
    this.chatService.togglePinMessage();
  }

  handleDeleteMessage(): void {
    this.chatService.deleteMessage(this.message().id);
  }
}
