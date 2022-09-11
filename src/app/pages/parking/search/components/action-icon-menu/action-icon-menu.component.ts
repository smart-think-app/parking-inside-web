import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParkingActionRoles } from 'src/app/model/proxy_model/parking/parking_model';
import { CanActivate } from '@angular/router';
import { ParkingService } from 'src/app/services/parking.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/model/component_model/alert_dialog_data';
import { ParkingAlertDialog } from 'src/app/core/components/alert_dialog/alert_dialog.component';

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

  @Output() RefreshFlag = new EventEmitter<boolean>()
  @Input() ParkingId: number = 0
  constructor(
    private _parkingService: ParkingService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  approve() {
    let alertDialogModel: DialogData = {
      title:"Title",
      message:"msg"
    }
    this._parkingService.ApproveAPI(this.ParkingId).then((result) => {
      if (result.code == 200) {
        alertDialogModel.title = 'Success'
        alertDialogModel.message = 'Approve parking success'
        this.RefreshFlag.emit(true)
      } else {
        alertDialogModel.title = 'Failure'
        alertDialogModel.message = `${result.message} - [${result.code}]`
      }
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    }).catch(err => {
      let alertDialogModel: DialogData = {
        title:"Failure",
        message:"Create parking fail, contact Tran Quoc Huy"
      }
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    })
  }

  close() {
    let alertDialogModel: DialogData = {
      title:"Title",
      message:"msg"
    }
    this._parkingService.CloseAPI(this.ParkingId).then((result) => {
      if (result.code == 200) {
        alertDialogModel.title = 'Success'
        alertDialogModel.message = 'Close parking success'
        this.RefreshFlag.emit(true)
      } else {
        alertDialogModel.title = 'Failure'
        alertDialogModel.message = `${result.message} - [${result.code}]`
      }
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    }).catch(err => {
      let alertDialogModel: DialogData = {
        title:"Failure",
        message:"Create parking fail, contact Tran Quoc Huy"
      }
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    })
  }

}
