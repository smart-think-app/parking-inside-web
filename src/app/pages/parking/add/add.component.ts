import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParkingCity, ParkingTypes } from 'src/app/model/proxy_model/parking/parking_model';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  cities: ParkingCity[] = [
    {id:1,name:"HCM"},
    {id:2,name:"HN"}
  ]
  parkingTypesForm = new FormControl('');
  parkingTypes: ParkingTypes[] = [
    {value:1,name:"Car"},
    {value:2,name:"Motorbike"}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
