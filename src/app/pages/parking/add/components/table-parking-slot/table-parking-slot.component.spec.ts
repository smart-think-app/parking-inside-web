import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableParkingSlotComponent } from './table-parking-slot.component';

describe('TableParkingSlotComponent', () => {
  let component: TableParkingSlotComponent;
  let fixture: ComponentFixture<TableParkingSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableParkingSlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableParkingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
