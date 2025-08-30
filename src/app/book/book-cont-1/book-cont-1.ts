import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-book-cont-1',
  imports: [],
  templateUrl: './book-cont-1.html',
  styleUrl: './book-cont-1.scss'
})
export class BookCont1 implements OnInit {
  tocOpen = false;
  currentPage = 0;
  totalPages = 6; // Cover, Introduction, 4 chapters, Epilogue
  readingProgress = 0;

  private pages = [
    'cover',
    'introduction', 
    'chapter1',
    'chapter2', 
    'chapter3',
    'chapter4',
    'epilogue'
  ];

  ngOnInit() {
    this.updateReadingProgress();
  }

  toggleToc() {
    this.tocOpen = !this.tocOpen;
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.scrollToPage(this.pages[this.currentPage]);
      this.updateReadingProgress();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.scrollToPage(this.pages[this.currentPage]);
      this.updateReadingProgress();
    }
  }

  private scrollToPage(pageId: string) {
    const element = document.getElementById(pageId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  private updateReadingProgress() {
    this.readingProgress = (this.currentPage / (this.totalPages - 1)) * 100;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    // Update current page based on scroll position
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    for (let i = 0; i < this.pages.length; i++) {
      const element = document.getElementById(this.pages[i]);
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;
        
        if (scrollPosition >= elementTop - windowHeight / 2 && 
            scrollPosition < elementBottom - windowHeight / 2) {
          this.currentPage = i;
          this.updateReadingProgress();
          break;
        }
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        this.nextPage();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previousPage();
        break;
      case 'Escape':
        this.tocOpen = false;
        break;
    }
  }
}
