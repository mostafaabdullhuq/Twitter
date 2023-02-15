import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsRecommendationComponent } from './trends-recommendation.component';

describe('TrendsRecommendationComponent', () => {
  let component: TrendsRecommendationComponent;
  let fixture: ComponentFixture<TrendsRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendsRecommendationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendsRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
