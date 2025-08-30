import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCont1 } from './book-cont-1';

describe('BookCont1', () => {
  let component: BookCont1;
  let fixture: ComponentFixture<BookCont1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCont1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCont1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
