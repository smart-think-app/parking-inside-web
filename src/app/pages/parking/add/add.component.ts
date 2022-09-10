import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  selectedCity: ParkingCity = {
    city_name: '',
    city_id: 0,
  };
  selectedDistrict: ParkingDistrict = {
    city: {
      city_name: '',
      city_id: 0,
    },
    district_id: 0,
    district_name: '',
  };
  selectedWard: ParkingWard = {
    district: {
      city: {
        city_name: '',
        city_id: 0,
      },
      district_id: 0,
      district_name: '',
    },
    ward_name: '',
    ward_id: 0,
  };
  cities: ParkingCity[] = [];
  districts: ParkingDistrict[] = [];
  wards: ParkingWard[] = [];
  parkingTypesForm = new FormControl('');
  parkingTypes: ParkingTypes[] = [
    { value: 1, name: 'Car' },
    { value: 2, name: 'Motorbike' },
  ];
  constructor(private _parkingService: ParkingService) {}

  ngOnInit(): void {
    this._parkingService.getCity.subscribe((data) => {
      this.cities = data;
      this.selectedCity = this.cities[0];
      this.initFilterDistrictByCity();
    });
    this._parkingService.getDistrict.subscribe((data) => {
      this.districts = data;
      this.selectedDistrict = this.districts[0];
      this.initFilterWardByDistrict();
    });
    this._parkingService.getWard.subscribe((data) => {
      this.wards = data;
      this.selectedWard = this.wards[0];
    });
    this.initCitiesFilter();
  }

  initCitiesFilter() {
    this._parkingService.getListCitiesAPI();
  }

  initFilterDistrictByCity() {
    console.log("select district:" + this.selectedCity)
    if (this.selectedCity?.city_id > 0) {
      this._parkingService.getListDistrictsAPI(this.selectedCity.city_id);
    }
  }

  initFilterWardByDistrict() {
    console.log("select wards:" + this.selectedDistrict)
    if (
      this.selectedDistrict?.city?.city_id > 0 &&
      this.selectedDistrict?.district_id > 0
    ) {
      this._parkingService.getListWardsAPI(
        this.selectedDistrict.city.city_id,
        this.selectedDistrict.district_id
      );
    }
  }
}
