import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionIconMenuComponent } from './action-icon-menu.component';

describe('ActionIconMenuComponent', () => {
  let component: ActionIconMenuComponent;
  let fixture: ComponentFixture<ActionIconMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionIconMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionIconMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
