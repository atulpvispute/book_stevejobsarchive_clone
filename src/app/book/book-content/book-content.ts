import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.html',
  styleUrl: './book-content.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookContent implements AfterViewInit, OnDestroy {
  currentChapter: string = '';
  private intersectionObserver?: IntersectionObserver;

  ngAfterViewInit() {
    // Set up intersection observer after view is initialized
    setTimeout(() => {
      this.setupChapterObserver();
    }, 100);
  }

  ngOnDestroy() {
    // Clean up intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private setupChapterObserver() {
    // Create intersection observer to detect current chapter
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let mostVisible = entries.reduce((prev, current) => {
          return (current.intersectionRatio > prev.intersectionRatio) ? current : prev;
        });

        if (mostVisible.intersectionRatio > 0.1) {
          // Get the chapter attribute from the book-section element
          const bookSection = mostVisible.target as HTMLElement;
          if (bookSection && bookSection.classList.contains('book-section')) {
            const chapter = bookSection.getAttribute('chapter');
            if (chapter && chapter.trim()) {
              this.currentChapter = chapter.trim();
            } else {
              this.currentChapter = '';
            }
          }
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: '-20% 0px -20% 0px', // Trigger when element is 20% into viewport
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] // Multiple thresholds for better detection
      }
    );

    // Observe all book-section elements
    const bookSections = document.querySelectorAll('.book-section');
    bookSections.forEach(section => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(section);
      }
    });
  }
}
