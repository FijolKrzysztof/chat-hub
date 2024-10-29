import { IconsComponent } from './components/icons/icons.component';
import { ChatHubComponent } from './components/chat-hub/chat-hub.component';
import { Component, inject, OnInit } from '@angular/core';
import { IconComponent } from './components/icon/icon.component';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatHubComponent, IconComponent],
  templateUrl: 'app.component.html',
  styles: [`
    :host {
      display: block;
      background-image: radial-gradient(circle at top center, rgba(59, 130, 246, 0.08), transparent 40%),
      radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.08), transparent 40%);
    }
  `]
})
export class AppComponent implements OnInit {
  private readonly chatService = inject(ChatService);

  isExpanded = false;
  icons = IconsComponent;

  ngOnInit() {
    this.chatService.startSpamBot();
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
