import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddParkingSlotRequest } from './../../../../../model/proxy_model/parking/parking_model';

@Component({
  selector: 'app-parking-slot-form',
  templateUrl: './parking-slot-form.component.html',
  styleUrls: ['./parking-slot-form.component.css']
})
export class ParkingSlotFormComponent implements OnInit {

  @Input() parkingType: number = 0
  @Output() dataHandle = new EventEmitter<AddParkingSlotRequest>();
  totalSlotForm = new FormControl<number>(0,[Validators.min(0) , Validators.max(1000000)])
  priceForm = new FormControl<number>(0,[Validators.min(0) , Validators.max(1000000000)])

  addParkingSlotForm = this._formBuilder.group({
    totalSlotForm: this.totalSlotForm,
    priceForm: this.priceForm
  })
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onChange(text: string) {
    this.dataHandle.emit({
      parking_type: this.parkingType,
      total_slot: this.addParkingSlotForm.value.totalSlotForm as number,
      price: this.addParkingSlotForm.value.priceForm as number,
    })
  }
}
