import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyHeaderHomeComponent } from './sticky-header-home.component';

describe('StickyHeaderHomeComponent', () => {
  let component: StickyHeaderHomeComponent;
  let fixture: ComponentFixture<StickyHeaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyHeaderHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyHeaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
