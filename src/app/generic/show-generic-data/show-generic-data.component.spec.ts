import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGenericDataComponent } from './show-generic-data.component';

describe('ShowGenericDataComponent', () => {
  let component: ShowGenericDataComponent;
  let fixture: ComponentFixture<ShowGenericDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowGenericDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowGenericDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
