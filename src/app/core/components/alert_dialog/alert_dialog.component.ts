import {Component, Inject, Input} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/model/component_model/alert_dialog_data';


@Component({
  selector: 'parking-alert-dialog',
  templateUrl: 'alert_dialog.component.html',
})
export class ParkingAlertDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}