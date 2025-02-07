import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantorProjectDetailComponent } from './grantor-project-detail.component';

describe('GrantorProjectDetailComponent', () => {
  let component: GrantorProjectDetailComponent;
  let fixture: ComponentFixture<GrantorProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrantorProjectDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrantorProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
