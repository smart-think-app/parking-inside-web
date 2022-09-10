import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  LoginRequest,
  AuthInfoModel,
  ParkingResponseBase,
  ParkingCity,
  ParkingDistrict,
  ParkingWard,
  AddParkingRequest,
} from './../model/proxy_model/parking/parking_model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { PARKING_ACCESS_TOKEN } from '../core/constants/constants';
import { ErrorAPICodeData } from '../model/component_model/alert_dialog_data';
@Injectable({
  providedIn: 'root',
})

export class ParkingService {

  private _cityData: BehaviorSubject<ParkingCity[]> = new BehaviorSubject<ParkingCity[]>([]);
  private _districtData: BehaviorSubject<ParkingDistrict[]> = new BehaviorSubject<ParkingDistrict[]>([]);
  private _wardData: BehaviorSubject<ParkingWard[]> = new BehaviorSubject<ParkingWard[]>([]);
  private _parkingInfo: BehaviorSubject<AuthInfoModel> = new BehaviorSubject({
    token:"",
    phone:"",
    username:""
  });

  get getToken() {
    return this._parkingInfo.asObservable();
  }
  get getCity() {
    return this._cityData.asObservable();
  }
  get getDistrict(){
    return this._districtData.asObservable();
  }
  get getWard(){
    return this._wardData.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  login(request: LoginRequest) {
    return new Promise((resolve , reject) =>{
      this.httpClient.post<ParkingResponseBase>(environment.parking_url + 
        "/api/internal/v1/auth/login" , request).
        subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              const parkingInfo:AuthInfoModel = {
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

  getListCitiesAPI() {
    return this.httpClient.get<ParkingResponseBase>(environment.parking_url + "/api/public/v1/location/cities").
    subscribe(
      {
        next: (resp) =>{
          if (resp.code == 200) {
            this._cityData.next(resp.data != null? resp.data.map((item:any) =>{
              const city: ParkingCity = {
                city_id: item.city_id,
                city_name: item.city_name
              };
              return city;
            }): []);
          }
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
          console.log("Complete API Get City")
        }
      }
    )
  }

  getListDistrictsAPI(cityId: number) {
    return this.httpClient.get<ParkingResponseBase>(environment.parking_url + 
      `/api/public/v1/location/cities/${cityId}/districts`).
    subscribe(
      {
        next: (resp) =>{
          if (resp.code == 200) {
            this._districtData.next(resp.data != null? resp.data.map((item:any) =>{
              const district: ParkingDistrict = {
                city: {city_name: item.city_name,city_id: item.city_id},
                district_id: item.district_id,
                district_name: item.district_name
              };
              return district;
            }): []);
          }
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
          console.log("Complete API Get District By City ID")
        }
      }
    )
  }

  getListWardsAPI(cityId: number,districtId: number) {
    return this.httpClient.get<ParkingResponseBase>(environment.parking_url + 
      `/api/public/v1/location/cities/${cityId}/districts/${districtId}/wards`).
    subscribe(
      {
        next: (resp) =>{
          if (resp.code == 200) {
            this._wardData.next(resp.data != null? resp.data.map((item:any) =>{
              const ward: ParkingWard = {
                district: {
                  city:{
                    city_id: item.city_id,
                    city_name: item.city_name,
                  },
                  district_name: item.district_name,
                  district_id: item.district_id,
                },
                ward_id: item.ward_id,
                ward_name: item.ward_name
              };
              return ward;
            }): []);
          }
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
          console.log("Complete API Get Wards")
        }
      }
    )
  }

  private _initHeader() {
    const token = sessionStorage.getItem(PARKING_ACCESS_TOKEN)
    const httpHeader = new HttpHeaders().
    set('content-type', 'application/json').
    set('Access-Control-Allow-Origin', '*').
    set('Authorization' , token as string);
    return httpHeader
  }

  AddParkingAPI(request:AddParkingRequest){
    return new Promise<ErrorAPICodeData>((resolve , reject) =>{
      this.httpClient.post<ParkingResponseBase>(environment.parking_url + `/api/internal/v1/add`,request,{
        headers: this._initHeader()
      }).subscribe({
        next: (resp) => {
          console.log(resp)
          if (resp.code == 200) {
            resolve({
              message: "success",
              code: 200
            })
          }else {
            resolve({
              message: resp.message,
              code: resp.code
            })
          }
        },
        error: (e) => {
          console.log(e)
          if (e?.error?.code != 200) {
            resolve({
              message: e?.error?.message,
              code: e?.error?.code
            })
          }
        },
        complete: () => {
          console.log("Complete API Add Parking")
        }
      })
    })
  }
}
