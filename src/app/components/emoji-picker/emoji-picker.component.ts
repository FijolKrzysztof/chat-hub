import { Component, ElementRef, OnDestroy, OnInit, output, viewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-emoji-picker',
  standalone: true,
  template: `
    <div
      #container
      class="p-2 bg-slate-800 rounded-lg shadow-xl border border-slate-700"
    >
      <div class="grid grid-cols-8 gap-1">
        @for (emoji of emojis; track emoji) {
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center hover:bg-slate-700 rounded cursor-pointer text-lg"
            (click)="selectEmoji(emoji)"
          >
            {{ emoji }}
          </button>
        }
      </div>
    </div>
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
  imports: [
    AsyncPipe
  ],
})
export class EmojiPickerComponent implements OnInit, OnDestroy {

  selected = output<string>();
  clickOutside = output();

  container = viewChild<ElementRef>('container');

  readonly emojis = [
    '😀', '😂', '🤣', '😊', '🥰', '😎', '🤔', '😴',
    '👍', '👎', '👏', '🙌', '🎉', '❤️', '😢', '😡',
    '🔥', '✨', '⭐', '💡', '💪', '🤝', '🎵', '🎮'
  ];

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }

  selectEmoji(emoji: string): void {
    this.selected.emit(emoji);
  }

  private readonly handleClickOutside = (event: MouseEvent) => {
    const element = this.container()?.nativeElement;

    if (element && !element.contains(event.target as Node)) {
      this.clickOutside.emit();
    }
  };
}
