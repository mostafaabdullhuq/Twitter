import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersAndFollowingComponent } from './followers-and-following.component';

describe('FollowersAndFollowingComponent', () => {
  let component: FollowersAndFollowingComponent;
  let fixture: ComponentFixture<FollowersAndFollowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowersAndFollowingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowersAndFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
