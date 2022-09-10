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

export interface ParkingCity{
    city_id: number,
    city_name: string
}

export interface ParkingDistrict{
    city: ParkingCity,
    district_id: number,
    district_name: string
}

export interface ParkingWard{
    district: ParkingDistrict,
    ward_id:number,
    ward_name: string
}
export interface ParkingTypes{
    value: number,
    name: string
}