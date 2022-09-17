import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParkingSlotModalComponent } from './update-parking-slot-modal.component';

describe('UpdateParkingSlotModalComponent', () => {
  let component: UpdateParkingSlotModalComponent;
  let fixture: ComponentFixture<UpdateParkingSlotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParkingSlotModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateParkingSlotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
