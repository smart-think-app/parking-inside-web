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
    return new Promise((resolve , reject) =>{
      this.httpClient.post<ParkingResponseBase>(environment.parking_url + 
        "/api/internal/v1/auth/login" , request).
        subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              const parkingInfo:ParkingInfoModel = {
                token : resp.data.token,
                phone: resp.data.phone,
                username: resp.data.username
              };
              sessionStorage.setItem(PARKING_ACCESS_TOKEN , resp.data.token)
              this._parkingInfo.next(parkingInfo);
              resolve(true);
            } else {
              reject(resp.message)
            }
          },
          error: (e) => {
            reject(e)
          },
          complete: () =>{
            console.log("login complete")
          }
        })
    })
  }
}
