import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetPopupComponent } from './tweet-popup.component';

describe('TweetPopupComponent', () => {
  let component: TweetPopupComponent;
  let fixture: ComponentFixture<TweetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
