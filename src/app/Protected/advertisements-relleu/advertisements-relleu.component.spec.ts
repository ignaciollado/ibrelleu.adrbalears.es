import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsRelleuComponent } from './advertisements-relleu.component';

describe('AdvertisementsRelleuComponent', () => {
  let component: AdvertisementsRelleuComponent;
  let fixture: ComponentFixture<AdvertisementsRelleuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertisementsRelleuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementsRelleuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
