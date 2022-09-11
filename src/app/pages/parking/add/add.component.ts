import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AddParkingRequest,
  ParkingCity,
  ParkingDistrict,
  ParkingTypes,
} from 'src/app/model/proxy_model/parking/parking_model';
import { ParkingService } from 'src/app/services/parking.service';
import { environment } from 'src/environments/environment';
import { ParkingWard } from './../../../model/proxy_model/parking/parking_model';
import { MatDialog } from '@angular/material/dialog';
import { APICodeData, DialogData,  } from 'src/app/model/component_model/alert_dialog_data';
import { ParkingAlertDialog } from 'src/app/core/components/alert_dialog/alert_dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  cities: ParkingCity[] = [];
  districts: ParkingDistrict[] = [];
  wards: ParkingWard[] = [];
  parkingTypes: ParkingTypes[] = [
    { value: 1, name: 'Car' },
    { value: 2, name: 'Motorbike' },
  ];

  parkingNameForm = new FormControl('',[Validators.required])
  parkingPhoneForm = new FormControl('',[])
  ownerNameForm = new FormControl('',[])
  ownerPhoneForm = new FormControl('',[])
  addressForm = new FormControl('',[Validators.required])
  cityForm = new FormControl<number>(0,[Validators.required])
  districtForm = new FormControl<number>(0,[Validators.required])
  wardForm = new FormControl<number>(0,[Validators.required])
  parkingTypesForm = new FormControl<number[]>([],[Validators.required])
  latForm = new FormControl<number>(0,[Validators.required])
  lngForm = new FormControl<number>(0,[Validators.required])

  addParkingForm = this.formBuilder.group({
    parkingNameForm: this.parkingNameForm,
    parkingPhoneForm: this.parkingPhoneForm,
    ownerNameForm: this.ownerNameForm,
    ownerPhoneForm: this.ownerPhoneForm,
    addressForm: this.addressForm,
    cityForm: this.cityForm,
    districtForm: this.districtForm,
    wardForm: this.wardForm,
    parkingTypesForm: this.parkingTypesForm,
    latForm: this.latForm,
    lngForm: this.lngForm
  })
  constructor(
    private _parkingService: ParkingService,
    private formBuilder:FormBuilder,
    private _router: Router,
    public dialog: MatDialog,
    ) {}
  
  ngOnInit(): void {
    this._parkingService.getCity.subscribe((data) => {
      this.cities = data;
      this.addParkingForm.patchValue({
        cityForm : this.cities[0]?.city_id
      })
      this.initFilterDistrictByCity();
    });
    this._parkingService.getDistrict.subscribe((data) => {
      this.districts = data;
      this.addParkingForm.patchValue({
        districtForm : this.districts[0]?.district_id
      })
      this.initFilterWardByDistrict();
    });
    this._parkingService.getWard.subscribe((data) => {
      this.wards = data;
      this.addParkingForm.patchValue({
        wardForm: this.wards[0]?.ward_id
      })
    });
    this.initCitiesFilter();
  }

  initCitiesFilter() {
    this._parkingService.getListCitiesAPI();
  }

  initFilterDistrictByCity() {
    console.log("select district:" + this.addParkingForm.value.cityForm)
    const cityId = this.addParkingForm.value.cityForm as number
    if (cityId > 0) {
      this._parkingService.getListDistrictsAPI(cityId);
    }
  }

  initFilterWardByDistrict() {
    const cityId = this.addParkingForm.value.cityForm as number
    const districtId = this.addParkingForm.value.districtForm as number 
    console.log("select wards:" + this.addParkingForm.value.districtForm)
    if ( cityId > 0 && districtId > 0) {
      this._parkingService.getListWardsAPI(cityId,districtId);
    }
  }
  add(){
    const request: AddParkingRequest = {
      address: this.addParkingForm.value.addressForm as string,
      ward_id: this.addParkingForm.value.wardForm as number,
      city_id: this.addParkingForm.value.cityForm as number,
      owner_phone: this.addParkingForm.value.ownerPhoneForm as string,
      parking_phone: this.addParkingForm.value.parkingPhoneForm as string,
      owner_name: this.addParkingForm.value.ownerNameForm as string,
      district_id: this.addParkingForm.value.districtForm as number,
      lat: this.addParkingForm.value.latForm as number,
      lng: this.addParkingForm.value.lngForm as number,
      parking_name: this.addParkingForm.value.parkingNameForm as string,
      parking_types: this.addParkingForm.value.parkingTypesForm as number[],
      region_id: 1
    }

    this._parkingService.AddParkingAPI(request).then((result: APICodeData) =>{
      let alertDialogModel: DialogData = {
        title:"Title",
        message:"msg"
      }
      if (result.code == 200) {
        alertDialogModel.title = 'Success'
        alertDialogModel.message = 'Create parking success, go to the listing page to check and approve'
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

  back(){
    this._router.navigate(['/parking'])
  }
}
