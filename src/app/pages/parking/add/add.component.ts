import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  ParkingCity,
  ParkingDistrict,
  ParkingTypes,
} from 'src/app/model/proxy_model/parking/parking_model';
import { ParkingService } from 'src/app/services/parking.service';
import { ParkingWard } from './../../../model/proxy_model/parking/parking_model';

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
  parkingTypesForm = new FormControl('',[Validators.required])
  latForm = new FormControl('',[Validators.required])
  lngForm = new FormControl('',[Validators.required])

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
    console.log(this.addParkingForm.value.parkingTypesForm)
  }
}
