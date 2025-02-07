import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantorProjectsComponent } from './grantor-projects.component';

describe('GrantorProjectsComponent', () => {
  let component: GrantorProjectsComponent;
  let fixture: ComponentFixture<GrantorProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrantorProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrantorProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
