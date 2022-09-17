import { Component, Input, OnInit } from '@angular/core';
import { ParkingDetailSlotModel } from 'src/app/model/proxy_model/parking/parking_model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateParkingSlotModalComponent, ParkingSlotDialogData } from './../update-parking-slot-modal/update-parking-slot-modal.component';

@Component({
  selector: 'app-table-parking-slot',
  templateUrl: './table-parking-slot.component.html',
  styleUrls: ['./table-parking-slot.component.css']
})
export class TableParkingSlotComponent implements OnInit {

  @Input() parkingSlot:ParkingDetailSlotModel[] = []
  @Input() parkingId: number = 0
  displayedColumns: string[] = ['type', 'total_slot', 'price', 'edit'];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  edit(model: ParkingDetailSlotModel) {
    const dialog: ParkingSlotDialogData = {
      Mode:1,
      ParkingSlotModel: model,
      ParkingId:  this.parkingId
    }
    this.dialog.open(UpdateParkingSlotModalComponent , {
      data: dialog
    });
  }

  add() {
    const dialog: ParkingSlotDialogData = {
      Mode:2,
      ParkingSlotModel: {
        Id:0,
        TotalSlot:0,
        Price:0,
        Type:0,
        TypeDisplay:""
      },
      ParkingId: this.parkingId
    }
    this.dialog.open(UpdateParkingSlotModalComponent , {
      data: dialog
    });
  }

}
