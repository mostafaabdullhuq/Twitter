import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyHeaderFollowingComponent } from './sticky-header-following.component';

describe('StickyHeaderFollowingComponent', () => {
  let component: StickyHeaderFollowingComponent;
  let fixture: ComponentFixture<StickyHeaderFollowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyHeaderFollowingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyHeaderFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
