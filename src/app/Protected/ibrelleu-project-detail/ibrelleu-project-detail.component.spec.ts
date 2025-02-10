import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbrelleuProjectDetailComponent } from './ibrelleu-project-detail.component';

describe('IbrelleuProjectDetailComponent', () => {
  let component: IbrelleuProjectDetailComponent;
  let fixture: ComponentFixture<IbrelleuProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IbrelleuProjectDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IbrelleuProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
