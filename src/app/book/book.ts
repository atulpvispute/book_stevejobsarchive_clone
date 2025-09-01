import { Component, HostListener } from '@angular/core';
import { BookContent } from './book-content/book-content';
import { BookCont1 } from './book-cont-1/book-cont-1';

@Component({
  selector: 'app-book',
  imports: [BookContent],
  templateUrl: './book.html',
  styleUrl: './book.scss'
})
export class Book {
  scrollProgress: number = 0;
  isDragging: boolean = false;
  isDragScaling: boolean = false;
  isScrollProgressVisible: boolean = false;
  private scrollTimeout: any;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // console.log('Scroll event triggered:', event);
    // console.log('Scroll position X, Y:', window.scrollX, window.scrollY);
    this.updateScrollProgress();
    this.showScrollProgress();
  }

  private updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollHeight > 0) {
      this.scrollProgress = (scrollTop / scrollHeight) * 100;
    } else {
      this.scrollProgress = 0;
    }
  }

  private showScrollProgress() {
    // Show the progress bar immediately
    this.isScrollProgressVisible = true;
    
    // Clear any existing timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    // Set a new timeout to hide after 1 second
    this.scrollTimeout = setTimeout(() => {
      this.isScrollProgressVisible = false;
    }, 700);
  }

  onProgressBarClick(event: MouseEvent) {
    // Don't trigger click if we just finished dragging
    if (this.isDragging) {
      return;
    }
    
    this.scrollToPosition(event);
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.isDragScaling = true;
    this.showScrollProgress(); // Show progress bar when interacting
    event.preventDefault(); // Prevent text selection
    this.scrollToPosition(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      event.preventDefault();
      this.scrollToPosition(event);
    }
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    this.isDragScaling = false;
  }

  private scrollToPosition(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    
    // Calculate the click/drag position relative to the progress bar
    const clickY = event.clientY - rect.top;
    const barHeight = rect.height;
    
    // Clamp the position within the bar bounds
    const clampedY = Math.max(0, Math.min(clickY, barHeight));
    
    // Calculate the percentage of where the user clicked/dragged (0 to 1)
    const clickPercentage = clampedY / barHeight;
    
    // Calculate the target scroll position
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const targetScrollPosition = clickPercentage * scrollHeight;
    
    // Scroll to the target position (no smooth behavior for dragging)
    window.scrollTo({
      top: targetScrollPosition,
      behavior: this.isDragging ? 'auto' : 'smooth'
    });
  }

}
