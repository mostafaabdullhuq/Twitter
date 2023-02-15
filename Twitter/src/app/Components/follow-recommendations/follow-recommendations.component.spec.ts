import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowRecommendationsComponent } from './follow-recommendations.component';

describe('FollowRecommendationsComponent', () => {
  let component: FollowRecommendationsComponent;
  let fixture: ComponentFixture<FollowRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowRecommendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
