import { TestBed } from '@angular/core/testing';

import { ParkingSlotService } from './parking-slot.service';

describe('ParkingSlotService', () => {
  let service: ParkingSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
