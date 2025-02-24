import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsRelleuDetailComponent } from './advertisements-relleu-detail.component';

describe('AdvertisementsRelleuDetailComponent', () => {
  let component: AdvertisementsRelleuDetailComponent;
  let fixture: ComponentFixture<AdvertisementsRelleuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertisementsRelleuDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementsRelleuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
