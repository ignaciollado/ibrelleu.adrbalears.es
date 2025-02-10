import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbrelleuProjectsComponent } from './ibrelleu-projects.component';

describe('IbrelleuProjectsComponent', () => {
  let component: IbrelleuProjectsComponent;
  let fixture: ComponentFixture<IbrelleuProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IbrelleuProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IbrelleuProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
