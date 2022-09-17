import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParkingResponseBase } from './../model/proxy_model/parking/parking_model';
import { PARKING_ACCESS_TOKEN } from '../core/constants/constants';
import { environment } from './../../environments/environment';
import { APICodeData } from '../model/component_model/alert_dialog_data';
import { AddOneParkingSlotRequest, UpdateOneParkingSlotRequest } from '../model/proxy_model/parking_slot/parking_slot';

@Injectable({
  providedIn: 'root'
})
export class ParkingSlotService {

  constructor(private httpClient: HttpClient) { }

  private _initHeader() {
    const token = sessionStorage.getItem(PARKING_ACCESS_TOKEN);
    const httpHeader = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', token as string);
    return httpHeader;
  }

  addParkingSlot(request: AddOneParkingSlotRequest,parkingId: number) {
    return new Promise<APICodeData>((resolve , reject) => {
      this.httpClient.post<ParkingResponseBase>(environment.parking_url + 
        `/api/internal/v1/${parkingId}/parking-slot/add`, request,{
          headers: this._initHeader()
        }).
        subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve({
                message: 'success',
                code: 200,
              });
            }else {
              resolve({
                message: resp.message,
                code: resp.code,
              });
            }
          },
          error: (e) => {
            resolve({
              message: e?.error?.message,
              code: e?.error?.code,
            });
          }
        })
    })
  }

  UpdateParkingSlot(request: UpdateOneParkingSlotRequest) {
    return new Promise<APICodeData>((resolve , reject) => {
      this.httpClient.put<ParkingResponseBase>(environment.parking_url + 
        `/api/internal/v1/${request.parking_id}/parking-slot/${request.parking_slot_id}/update`, request,{
          headers: this._initHeader()
        }).
        subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve({
                message: 'success',
                code: 200,
              });
            }else {
              resolve({
                message: resp.message,
                code: resp.code,
              });
            }
          },
          error: (e) => {
            resolve({
              message: e?.error?.message,
              code: e?.error?.code,
            });
          }
        })
    })
  }
}
