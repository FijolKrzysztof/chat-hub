import { Component } from '@angular/core';

@Component({
  selector: 'app-typing-indicator',
  standalone: true,
  template: `
    <div class="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-700 w-fit">
      <div class="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></div>
      <div class="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></div>
      <div class="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
    </div>
  `
})
export class TypingIndicatorComponent {}
