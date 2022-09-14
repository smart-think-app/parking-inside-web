import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSlotFormComponent } from './parking-slot-form.component';

describe('ParkingSlotFormComponent', () => {
  let component: ParkingSlotFormComponent;
  let fixture: ComponentFixture<ParkingSlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingSlotFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingSlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
