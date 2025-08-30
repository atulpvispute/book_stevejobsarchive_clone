import { Component, signal } from '@angular/core';
import { Page } from './page/page';

@Component({
  selector: 'app-root',
  imports: [Page],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('assignment-1');
}
