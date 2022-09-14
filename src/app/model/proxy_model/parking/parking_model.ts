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
    Index: number,
    Id: number,
    ParkingName: string,
    ParkingPhone: string,
    Status: number,
    StatusDisplay: string,
    ParkingTypes: number[],
    ActionRoles: ParkingActionRoles
}

export interface ParkingModelPaging {
    IsLastPage: boolean
    PageLimit: number,
    PageIndex: number,
    Total: number,
    Parks: ParkingModel[],
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

export interface AddParkingRequest {
    address: string,
    ward_id: number,
    city_id: number,
    owner_phone: string,
    parking_phone: string,
    owner_name: string,
    district_id: number,
    region_id: number,
    lat: number,
    lng: number,
    parking_name: string,
    parking_types:AddParkingSlotRequest[]
}

export interface AddParkingSlotRequest {
    parking_type: number,
    total_slot?: number,
    price: number
}

export interface ParkingActionRoles {
    CanApprove: boolean
    CanClose: boolean
    CanRemove: boolean
    CanBlock: boolean
    CanDenied: boolean
    CanReopen: boolean
}

export interface ListParkingRequest {
    page_index: number,
    page_limit: number
}