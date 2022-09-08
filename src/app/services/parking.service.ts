import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginRequest,
  ParkingInfoModel,
  ParkingResponseBase,
} from './../model/proxy_model/parking/parking_model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { PARKING_ACCESS_TOKEN } from '../core/constants/constants';
@Injectable({
  providedIn: 'root',
})

export class ParkingService {

  private _parkingInfo: BehaviorSubject<ParkingInfoModel> = new BehaviorSubject({
    token:"",
    phone:"",
    username:""
  });
  get getToken() {
    return this._parkingInfo.asObservable();
  }
  constructor(private httpClient: HttpClient) {}

  login(request: LoginRequest) {
    this.httpClient.post<ParkingResponseBase>(environment.parking_url + 
      "api/internal/v1/auth/login" , request).
      subscribe(response => {
        if (response.code == 200) {
          const parkingInfo:ParkingInfoModel = {
            token : response.data.token,
            phone: response.data.phone,
            username: response.data.username
          };
          sessionStorage.setItem(PARKING_ACCESS_TOKEN , response.data.token)
          this._parkingInfo.next(parkingInfo);
        }else {
          window.alert(response.message);
        }
      })
  }
}
