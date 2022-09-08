export interface LoginRequest {
    phone: string;
    password: string;
}

export interface ParkingResponseBase {
    code: number;
    data: any;
    message: string;
}

export interface ParkingInfoModel {
    token: string;
    phone: string;
    username: string;
  }