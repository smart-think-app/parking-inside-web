export interface LoginRequest {
    phone: string;
    password: string;
}

export interface ParkingResponseBase {
    code: number;
    data: any;
    message: string;
}

export interface AuthInfoModel {
    token: string;
    phone: string;
    username: string;
  }

export interface ParkingModel{
    id: number,
    parking_name: string,
    parking_phone: string,
    status: number,
    index:number
}