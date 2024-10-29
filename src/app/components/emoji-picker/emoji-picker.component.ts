import { Component, ElementRef, inject, OnDestroy, OnInit, output, signal, viewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-emoji-picker',
  standalone: true,
  template: `
    @if (showEmojiPicker()) {
      <div
        #container
        class="p-2 bg-slate-800 rounded-lg shadow-xl border border-slate-700"
      >
        <div class="grid grid-cols-8 gap-1">
          @for(emoji of emojis; track emoji) {
            <button
              type="button"
              class="w-8 h-8 flex items-center justify-center hover:bg-slate-700 rounded cursor-pointer text-lg"
              (click)="selectEmoji(emoji)"
            >
              {{emoji}}
            </button>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: 0.5rem;
      z-index: 50;
    }
  `],
  host: {
    class: 'absolute bottom-full right-0 mb-2 z-50 emoji-picker'
  }
})
export class EmojiPickerComponent implements OnInit, OnDestroy {
  private readonly chatService = inject(ChatService);

  selected = output<string>();

  container = viewChild<ElementRef>('container');

  private showEmojiSub = this.chatService.getShowEmojiPicker().subscribe(shouldShow => {
    if (shouldShow) {
      this.showEmojiPicker.set(true);
    }
  });

  readonly emojis = [
    '😀', '😂', '🤣', '😊', '🥰', '😎', '🤔', '😴',
    '👍', '👎', '👏', '🙌', '🎉', '❤️', '😢', '😡',
    '🔥', '✨', '⭐', '💡', '💪', '🤝', '🎵', '🎮'
  ];

  showEmojiPicker = signal(false);

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside);
    this.showEmojiSub.unsubscribe();
  }

  selectEmoji(emoji: string): void {
    this.selected.emit(emoji);
  }

  private readonly handleClickOutside = (event: MouseEvent) => {
    const element = this.container()?.nativeElement;

    if (element && !element.contains(event.target as Node)) {
      this.showEmojiPicker.set(false);
    }
  };
}
