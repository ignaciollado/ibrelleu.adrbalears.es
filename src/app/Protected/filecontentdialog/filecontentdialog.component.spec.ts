import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilecontentdialogComponent } from './filecontentdialog.component';

describe('FilecontentdialogComponent', () => {
  let component: FilecontentdialogComponent;
  let fixture: ComponentFixture<FilecontentdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilecontentdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilecontentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
