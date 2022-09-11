import { Component, Input, OnInit } from '@angular/core';
import { ParkingActionRoles } from 'src/app/model/proxy_model/parking/parking_model';
import { CanActivate } from '@angular/router';

@Component({
  selector: 'parking-action-icon-menu',
  templateUrl: './action-icon-menu.component.html',
  styleUrls: ['./action-icon-menu.component.css']
})
export class ActionIconMenuComponent implements OnInit {

  @Input() ActionRoles: ParkingActionRoles = {
    CanApprove: false,
    CanBlock: false,
    CanClose: false,
    CanDenied: false,
    CanRemove: false,
  }
  constructor() { }

  ngOnInit(): void {
  }

}
