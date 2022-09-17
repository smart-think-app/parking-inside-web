import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParkingDetailSlotModel } from 'src/app/model/proxy_model/parking/parking_model';
import { ParkingSlotService } from './../../../../../services/parking-slot.service';
import { ParkingService } from 'src/app/services/parking.service';

export interface ParkingSlotDialogData {
  Mode: number,
  ParkingSlotModel: ParkingDetailSlotModel,
  ParkingId: number
}
@Component({
  selector: 'app-update-parking-slot-modal',
  templateUrl: './update-parking-slot-modal.component.html',
  styleUrls: ['./update-parking-slot-modal.component.css']
})
export class UpdateParkingSlotModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ParkingSlotDialogData,
  private _formBuilder: FormBuilder,
  private _parkingSlotSv: ParkingSlotService,
  private _parkingSv: ParkingService) { }

  message = ''
  isError = false
  totalSlotForm = new FormControl<number>(0,[])
  priceForm = new FormControl<number>(0,[])
  typeForm = new FormControl<number>(0,[Validators.required,Validators.min(1)])
  parkingSlotFormGroup = this._formBuilder.group({
    totalSlotForm:this.totalSlotForm,
    priceForm:this.priceForm,
    typeForm: this.typeForm
  })
  filterType = [{
    Type:1,
    TypeDisplay: 'Car'
  },{
    Type:2,
    TypeDisplay: 'Motorbike'
  }]
  ngOnInit(): void {
    if (this.data.Mode == 1) {
      this.parkingSlotFormGroup.patchValue({
        totalSlotForm: this.data.ParkingSlotModel.TotalSlot as number,
        priceForm: this.data.ParkingSlotModel.Price as number
      })
    }
  }

  add() {
    this._parkingSlotSv.addParkingSlot({
      type: this.parkingSlotFormGroup.value.typeForm as number,
      total_slot: this.parkingSlotFormGroup.value.totalSlotForm as number,
      price: this.parkingSlotFormGroup.value.priceForm as number
    } , this.data.ParkingId).then((resp) => {
      if (resp.code == 200) {
        this.message = "Success"
        this.isError = false
        this._parkingSv.GetDetailParkingAPIWithObserver(this.data.ParkingId)
      }else {
        this.isError = true
        this.message = resp.message
      }
    }).catch(e => {
      this.isError = true
      this.message = e
    })
  }

  update() {
    this._parkingSlotSv.UpdateParkingSlot({
      total_slot: this.parkingSlotFormGroup.value.totalSlotForm as number,
      price: this.parkingSlotFormGroup.value.priceForm as number,
      parking_id: this.data.ParkingId,
      parking_slot_id:this.data.ParkingSlotModel.Id
    }).then((resp) => {
      if (resp.code == 200) {
        this.message = "Success"
        this.isError = false
        this._parkingSv.GetDetailParkingAPIWithObserver(this.data.ParkingId)
      }else {
        this.isError = true
        this.message = resp.message
      }
    }).catch(e => {
      this.isError = true
      this.message = e
    })
  }
}
