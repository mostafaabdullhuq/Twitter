import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetSharedComponent } from './tweet-shared.component';

describe('TweetSharedComponent', () => {
  let component: TweetSharedComponent;
  let fixture: ComponentFixture<TweetSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetSharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
