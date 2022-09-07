import { TestBed } from '@angular/core/testing';

import { ParkingGuard } from './parking-guard.guard';

describe('ParkingGuardGuard', () => {
  let guard: ParkingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ParkingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
