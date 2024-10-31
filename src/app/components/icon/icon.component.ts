import { Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: '<span class="flex items-center" [innerHTML]="icon()" [class]="className()"></span>'
})
export class IconComponent {
  readonly sanitizer = inject(DomSanitizer);

  className = input('');
  icon = input.required<SafeHtml, string>({
    transform: (value: string) => this.sanitizer.bypassSecurityTrustHtml(value)
  });
}
