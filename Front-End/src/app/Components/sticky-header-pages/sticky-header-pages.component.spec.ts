import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyHeaderPagesComponent } from './sticky-header-pages.component';

describe('StickyHeaderPagesComponent', () => {
  let component: StickyHeaderPagesComponent;
  let fixture: ComponentFixture<StickyHeaderPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyHeaderPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyHeaderPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
