import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStoriesDetailComponent } from './success-stories-detail.component';

describe('SuccessStoriesDetailComponent', () => {
  let component: SuccessStoriesDetailComponent;
  let fixture: ComponentFixture<SuccessStoriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessStoriesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessStoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
