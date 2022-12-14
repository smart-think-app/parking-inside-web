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
  ListParkingRequest,
  ParkingModel,
  ParkingModelPaging,
  ParkingDetailModel,
  ParkingDetailSlotModel,
  UpdateParkingRequest,
} from './../model/proxy_model/parking/parking_model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { PARKING_ACCESS_TOKEN } from '../core/constants/constants';
import { APICodeData } from '../model/component_model/alert_dialog_data';
@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private _parkingPaging: BehaviorSubject<ParkingModelPaging> =
    new BehaviorSubject<ParkingModelPaging>({
      IsLastPage: false,
      PageIndex: 1,
      PageLimit: 10,
      Total: 0,
      Parks: [],
    });
  private _cityData: BehaviorSubject<ParkingCity[]> = new BehaviorSubject<
    ParkingCity[]
  >([]);
  private _districtData: BehaviorSubject<ParkingDistrict[]> =
    new BehaviorSubject<ParkingDistrict[]>([]);
  private _wardData: BehaviorSubject<ParkingWard[]> = new BehaviorSubject<
    ParkingWard[]
  >([]);
  private _parkingInfo: BehaviorSubject<AuthInfoModel> = new BehaviorSubject({
    token: '',
    phone: '',
    username: '',
  });
  private _detailParkingInfo: BehaviorSubject<ParkingDetailModel> =
    new BehaviorSubject({
      Id: 0,
      ParkingName: '',
      ParkingPhone: '',
      Status: 0,
      Address: '',
      Lat: 0,
      Lng: 0,
      ParkingTypes: [<ParkingDetailSlotModel>{}],
      OpenAtHour: 0,
      OpenAtMinute: 0,
      CloseAtHour: 0,
      CloseAtMinute: 0,
      CityId: 0,
      DistrictId: 0,
      WardId: 0,
      OwnerName: '',
      OwnerPhone: '',
    });
  get getDetailParkingInfo() {
    return this._detailParkingInfo.asObservable();
  }
  get getParkingPaging() {
    return this._parkingPaging.asObservable();
  }
  get getToken() {
    return this._parkingInfo.asObservable();
  }
  get getCity() {
    return this._cityData.asObservable();
  }
  get getDistrict() {
    return this._districtData.asObservable();
  }
  get getWard() {
    return this._wardData.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  login(request: LoginRequest) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<ParkingResponseBase>(
          environment.parking_url + '/api/internal/v1/auth/login',
          request
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              const parkingInfo: AuthInfoModel = {
                token: resp.data.token,
                phone: resp.data.phone,
                username: resp.data.username,
              };
              sessionStorage.setItem(PARKING_ACCESS_TOKEN, resp.data.token);
              this._parkingInfo.next(parkingInfo);
              resolve(true);
            } else {
              reject(resp.message);
            }
          },
          error: (e) => {
            reject(e);
          },
          complete: () => {
            console.log('login complete');
          },
        });
    });
  }

  getListCitiesAPI() {
    return this.httpClient
      .get<ParkingResponseBase>(
        environment.parking_url + '/api/public/v1/location/cities'
      )
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            this._cityData.next(
              resp.data != null
                ? resp.data.map((item: any) => {
                    const city: ParkingCity = {
                      city_id: item.city_id,
                      city_name: item.city_name,
                    };
                    return city;
                  })
                : []
            );
          }
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log('Complete API Get City');
        },
      });
  }

  GetListCityAPICallback() {
    return new Promise<ParkingCity[]>((resolve, reject) => {
      this.httpClient
        .get<ParkingResponseBase>(
          environment.parking_url + '/api/public/v1/location/cities'
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resp.data != null
                ? resp.data.map((item: any) => {
                    const city: ParkingCity = {
                      city_id: item.city_id,
                      city_name: item.city_name,
                    };
                    return city;
                  })
                : [];
                resolve(resp.data);
            }
          },
          error: (e) => {
            console.log(e);
            reject(e);
          },
          complete: () => {
            console.log('Complete API Get City');
          },
        });
    });
  }

  GetListDistrictByCityAPICallback(cityId: number ) {
    return new Promise<ParkingDistrict[]>((resolve, reject) => {
      this.httpClient
        .get<ParkingResponseBase>(
          environment.parking_url + `/api/public/v1/location/cities/${cityId}/districts`
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve(
                resp.data != null
                  ? resp.data.map((item: any) => {
                      const district: ParkingDistrict = {
                        city: {
                          city_name: item.city_name,
                          city_id: item.city_id,
                        },
                        district_id: item.district_id,
                        district_name: item.district_name,
                      };
                      return district;
                    })
                  : []
              );
            }
          },
          error: (e) => {
            console.log(e);
            reject(e);
          },
          complete: () => {
            console.log('Complete API Get District Callback');
          },
        });
    });
  }

  GetDetailParkingAPI(parkingId: number) {
    return new Promise<ParkingDetailModel>((resolve, reject) => {
      this.httpClient
        .get<ParkingResponseBase>(
          environment.parking_url + `/api/internal/v1/${parkingId}/detail`,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              const dataResp: ParkingDetailModel = {
                Id: resp.data.id,
                ParkingName: resp.data.parking_name,
                ParkingPhone: resp.data.parking_phone,
                Status: resp.data.status,
                Address: resp.data.address,
                Lat: resp.data.location.lat,
                Lng: resp.data.location.lng,
                ParkingTypes: resp.data.parking_types.map((item: any) => {
                  const dataItem: ParkingDetailSlotModel = {
                    Id: item.id,
                    Type: item.type,
                    TotalSlot: item.total_slot,
                    Price: item.price,
                    TypeDisplay: item.type_display
                  };
                  return dataItem;
                }),
                OpenAtHour: resp.data.open_at_hour,
                OpenAtMinute: resp.data.open_at_minute,
                CloseAtHour: resp.data.close_at_hour,
                CloseAtMinute: resp.data.close_at_minute,
                CityId: resp.data.city_id,
                DistrictId: resp.data.district_id,
                WardId: resp.data.ward_id,
                OwnerName: resp.data.owner_name,
                OwnerPhone: resp.data.owner_phone,
              };
              resolve(dataResp);
            }
          },
          error: (e) => {
            reject(e);
          },
        });
    });
  }

  GetDetailParkingAPIWithObserver(parkingId: number) {
    return this.httpClient
    .get<ParkingResponseBase>(
      environment.parking_url + `/api/internal/v1/${parkingId}/detail`,
      {
        headers: this._initHeader(),
      }
    )
    .subscribe({
      next: (resp) => {
        if (resp.code == 200) {
          const dataResp: ParkingDetailModel = {
            Id: resp.data.id,
            ParkingName: resp.data.parking_name,
            ParkingPhone: resp.data.parking_phone,
            Status: resp.data.status,
            Address: resp.data.address,
            Lat: resp.data.location.lat,
            Lng: resp.data.location.lng,
            ParkingTypes: resp.data.parking_types.map((item: any) => {
              const dataItem: ParkingDetailSlotModel = {
                Id: item.id,
                Type: item.type,
                TotalSlot: item.total_slot,
                Price: item.price,
                TypeDisplay: item.type_display
              };
              return dataItem;
            }),
            OpenAtHour: resp.data.open_at_hour,
            OpenAtMinute: resp.data.open_at_minute,
            CloseAtHour: resp.data.close_at_hour,
            CloseAtMinute: resp.data.close_at_minute,
            CityId: resp.data.city_id,
            DistrictId: resp.data.district_id,
            WardId: resp.data.ward_id,
            OwnerName: resp.data.owner_name,
            OwnerPhone: resp.data.owner_phone,
          };
          this._detailParkingInfo.next(dataResp)
        }
      },
      error: (e) => {
      },
    });
  }

  UpdateParkingAPI(parkingId: number,request: UpdateParkingRequest) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .put<ParkingResponseBase>(
          environment.parking_url + `/api/internal/v1/${parkingId}/update`,request,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve(true);
            }
          },
          error: (e) => {
            reject(e);
          },
        });
    });
  }

  GetListParkingAPI(request: ListParkingRequest) {
    return this.httpClient
      .get<ParkingResponseBase>(
        environment.parking_url +
          '/api/internal/v1/retrieve' +
          `?page_limit=${request.page_limit}&page_index=${
            request.page_index + 1
          }`,
        {
          headers: this._initHeader(),
        }
      )
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            let parkingPaging: ParkingModelPaging = {
              Parks:
                resp.data != null
                  ? resp.data.parks?.map((item: any, index: number) => {
                      const parkingItem: ParkingModel = {
                        Index: index,
                        Id: item.id,
                        StatusDisplay: item.status_display,
                        ParkingName: item.parking_name,
                        ParkingPhone: item.parking_phone,
                        Status: item.status,
                        ActionRoles: {
                          CanApprove: item.roles.can_approve,
                          CanRemove: item.roles.can_remove,
                          CanDenied: item.roles.can_denied,
                          CanBlock: item.roles.can_block,
                          CanClose: item.roles.can_close,
                          CanReopen: item.roles.can_reopen,
                        },
                      };
                      return parkingItem;
                    })
                  : [],
              IsLastPage: resp.data?.is_last_page,
              PageLimit: resp.data?.page_limit,
              PageIndex: resp.data?.page_index,
              Total: resp.data?.total,
            };
            this._parkingPaging.next(parkingPaging);
          }
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log('Complete API Get Parking');
        },
      });
  }

  getListDistrictsAPI(cityId: number) {
    return this.httpClient
      .get<ParkingResponseBase>(
        environment.parking_url +
          `/api/public/v1/location/cities/${cityId}/districts`
      )
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            this._districtData.next(
              resp.data != null
                ? resp.data.map((item: any) => {
                    const district: ParkingDistrict = {
                      city: {
                        city_name: item.city_name,
                        city_id: item.city_id,
                      },
                      district_id: item.district_id,
                      district_name: item.district_name,
                    };
                    return district;
                  })
                : []
            );
          }
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log('Complete API Get District By City ID');
        },
      });
  }

  getListWardsAPI(cityId: number, districtId: number) {
    return this.httpClient
      .get<ParkingResponseBase>(
        environment.parking_url +
          `/api/public/v1/location/cities/${cityId}/districts/${districtId}/wards`
      )
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            this._wardData.next(
              resp.data != null
                ? resp.data.map((item: any) => {
                    const ward: ParkingWard = {
                      district: {
                        city: {
                          city_id: item.city_id,
                          city_name: item.city_name,
                        },
                        district_name: item.district_name,
                        district_id: item.district_id,
                      },
                      ward_id: item.ward_id,
                      ward_name: item.ward_name,
                    };
                    return ward;
                  })
                : []
            );
          }
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log('Complete API Get Wards');
        },
      });
  }

  getListWardsAPICallback(cityId: number, districtId: number) {
    return new Promise<ParkingWard[]>((resolve , reject) => {
      this.httpClient
      .get<ParkingResponseBase>(
        environment.parking_url +
          `/api/public/v1/location/cities/${cityId}/districts/${districtId}/wards`
      )
      .subscribe({
        next: (resp) => {
          if (resp.code == 200) {
            resolve(
              resp.data != null
                ? resp.data.map((item: any) => {
                    const ward: ParkingWard = {
                      district: {
                        city: {
                          city_id: item.city_id,
                          city_name: item.city_name,
                        },
                        district_name: item.district_name,
                        district_id: item.district_id,
                      },
                      ward_id: item.ward_id,
                      ward_name: item.ward_name,
                    };
                    return ward;
                  })
                : []
            );
          }
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log('Complete API Get Wards');
        },
      });
    })
  }

  private _initHeader() {
    const token = sessionStorage.getItem(PARKING_ACCESS_TOKEN);
    const httpHeader = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', token as string);
    return httpHeader;
  }

  AddParkingAPI(request: AddParkingRequest) {
    return new Promise<APICodeData>((resolve, reject) => {
      this.httpClient
        .post<ParkingResponseBase>(
          environment.parking_url + `/api/internal/v1/add`,
          request,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            console.log(resp);
            if (resp.code == 200) {
              resolve({
                message: 'success',
                code: 200,
              });
            } else {
              resolve({
                message: resp.message,
                code: resp.code,
              });
            }
          },
          error: (e) => {
            console.log(e);
            if (e?.error?.code != 200) {
              resolve({
                message: e?.error?.message,
                code: e?.error?.code,
              });
            }
          },
          complete: () => {
            console.log('Complete API Add Parking');
          },
        });
    });
  }

  ApproveAPI(parkingId: number) {
    return new Promise<APICodeData>((resolve, reject) => {
      this.httpClient
        .put<ParkingResponseBase>(
          environment.parking_url + `/api/internal/v1/${parkingId}/approve`,
          null,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve({
                code: 200,
                message: 'Success',
              });
            } else {
              resolve({
                code: resp.code,
                message: resp.message,
              });
            }
          },
          error: (e) => {
            console.log(e);
            if (e?.error?.code != 200) {
              resolve({
                message: e?.error?.message,
                code: e?.error?.code,
              });
            }
          },
        });
    });
  }

  CloseAPI(parkingId: number) {
    return new Promise<APICodeData>((resolve, reject) => {
      this.httpClient
        .put<ParkingResponseBase>(
          environment.parking_url + `/api/internal/v1/${parkingId}/close`,
          null,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve({
                code: 200,
                message: 'Success',
              });
            } else {
              resolve({
                code: resp.code,
                message: resp.message,
              });
            }
          },
          error: (e) => {
            console.log(e);
            if (e?.error?.code != 200) {
              resolve({
                message: e?.error?.message,
                code: e?.error?.code,
              });
            }
          },
        });
    });
  }

  ReopenAPI(parkingId: number) {
    return new Promise<APICodeData>((resolve, reject) => {
      this.httpClient
        .put<ParkingResponseBase>(
          environment.parking_url + `/api/internal/v1/${parkingId}/reopen`,
          null,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve({
                code: 200,
                message: 'Success',
              });
            } else {
              resolve({
                code: resp.code,
                message: resp.message,
              });
            }
          },
          error: (e) => {
            console.log(e);
            if (e?.error?.code != 200) {
              resolve({
                message: e?.error?.message,
                code: e?.error?.code,
              });
            }
          },
        });
    });
  }

  ApproveMultiAPI(parkingIds: number[]) {
    return new Promise<APICodeData>((resolve, reject) => {
      this.httpClient
        .put<ParkingResponseBase>(
          environment.parking_url +
            `/api/internal/v1/approve-multi/${parkingIds.join(',')}`,
          null,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve({
                code: 200,
                message: 'Success',
              });
            } else {
              resolve({
                code: resp.code,
                message: resp.message,
              });
            }
          },
          error: (e) => {
            console.log(e);
            if (e?.error?.code != 200) {
              resolve({
                message: e?.error?.message,
                code: e?.error?.code,
              });
            }
          },
        });
    });
  }

  SyncMultiESAPI(parkingIds: number[]) {
    return new Promise<APICodeData>((resolve, reject) => {
      this.httpClient
        .put<ParkingResponseBase>(
          environment.parking_url +
            `/api/internal/v1/sync-multi-es/${parkingIds.join(',')}`,
          null,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve({
                code: 200,
                message: 'Success',
              });
            } else {
              resolve({
                code: resp.code,
                message: resp.message,
              });
            }
          },
          error: (e) => {
            console.log(e);
            if (e?.error?.code != 200) {
              resolve({
                message: e?.error?.message,
                code: e?.error?.code,
              });
            }
          },
        });
    });
  }

  SyncOneESAPI(parkingId: number) {
    return new Promise<APICodeData>((resolve, reject) => {
      this.httpClient
        .put<ParkingResponseBase>(
          environment.parking_url + `/api/internal/v1/${parkingId}/sync-es`,
          null,
          {
            headers: this._initHeader(),
          }
        )
        .subscribe({
          next: (resp) => {
            if (resp.code == 200) {
              resolve({
                code: 200,
                message: 'Success',
              });
            } else {
              resolve({
                code: resp.code,
                message: resp.message,
              });
            }
          },
          error: (e) => {
            console.log(e);
            if (e?.error?.code != 200) {
              resolve({
                message: e?.error?.message,
                code: e?.error?.code,
              });
            }
          },
        });
    });
  }
}
