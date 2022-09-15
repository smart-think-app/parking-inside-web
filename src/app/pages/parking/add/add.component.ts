import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddParkingRequest,
  ParkingCity,
  ParkingDetailModel,
  ParkingDistrict,
  ParkingTypes,
  UpdateParkingRequest,
} from 'src/app/model/proxy_model/parking/parking_model';
import { ParkingService } from 'src/app/services/parking.service';
import { environment } from 'src/environments/environment';
import {
  ParkingWard,
  AddParkingSlotRequest,
} from './../../../model/proxy_model/parking/parking_model';
import { MatDialog } from '@angular/material/dialog';
import {
  APICodeData,
  DialogData,
} from 'src/app/model/component_model/alert_dialog_data';
import { ParkingAlertDialog } from 'src/app/core/components/alert_dialog/alert_dialog.component';
import { PARKING_ACCESS_TOKEN } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  mode = 1;
  cities: ParkingCity[] = [];
  districts: ParkingDistrict[] = [];
  wards: ParkingWard[] = [];
  parkingTypes: ParkingTypes[] = [
    { value: 1, name: 'Car' },
    { value: 2, name: 'Motorbike' },
  ];

  parkingSlotFormValid: AddParkingSlotRequest[] = [];
  parkingDetailModel?: ParkingDetailModel;

  parkingNameForm = new FormControl('', [Validators.required]);
  parkingPhoneForm = new FormControl('', []);
  ownerNameForm = new FormControl('', []);
  ownerPhoneForm = new FormControl('', []);
  addressForm = new FormControl('', [Validators.required]);
  cityForm = new FormControl<number>(0, [Validators.required]);
  districtForm = new FormControl<number>(0, [Validators.required]);
  wardForm = new FormControl<number>(0, [Validators.required]);
  parkingTypesForm = new FormControl<number[]>([], [Validators.required]);
  latForm = new FormControl<number>(0, [Validators.required]);
  lngForm = new FormControl<number>(0, [Validators.required]);
  hourOpenForm = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(23),
  ]);
  hourCloseForm = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(23),
  ]);
  minuteOpenForm = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(59),
  ]);
  minuteCloseForm = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(59),
  ]);

  addParkingForm = this.formBuilder.group({
    parkingNameForm: this.parkingNameForm,
    parkingPhoneForm: this.parkingPhoneForm,
    ownerNameForm: this.ownerNameForm,
    ownerPhoneForm: this.ownerPhoneForm,
    addressForm: this.addressForm,
    cityForm: this.cityForm,
    districtForm: this.districtForm,
    wardForm: this.wardForm,
    parkingTypesForm: this.parkingTypesForm,
    latForm: this.latForm,
    lngForm: this.lngForm,
    hourOpenForm: this.hourOpenForm,
    hourCloseForm: this.hourCloseForm,
    minuteOpenForm: this.minuteOpenForm,
    minuteCloseForm: this.minuteCloseForm,
  });
  constructor(
    private _activeRouter: ActivatedRoute,
    private _parkingService: ParkingService,
    private formBuilder: FormBuilder,
    private _router: Router,
    public dialog: MatDialog
  ) {}
  parkingId: number = this._activeRouter.snapshot.params['id'];
  ngOnInit(): void {
    // this.addParkingForm = this.formBuilder.group({...this.addParkingForm,minuteCloseForm: this.minuteCloseForm})
    this.initModeAdd();
    if (this.parkingId > 0) {
      this.mode = 2;
      this._parkingService.GetDetailParkingAPI(this.parkingId).then((data) => {
        console.log(data);
        this.addParkingForm.patchValue({
          parkingNameForm: data.ParkingName,
          parkingPhoneForm: data.ParkingPhone,
          ownerNameForm: data.OwnerName,
          ownerPhoneForm: data.OwnerPhone,
          addressForm: data.Address,
          parkingTypesForm: data.ParkingTypes.map((element) => {
            return element.Type;
          }),
          latForm: data.Lat,
          lngForm: data.Lng,
          hourCloseForm: data.CloseAtHour,
          hourOpenForm: data.OpenAtHour,
          minuteCloseForm: data.CloseAtMinute,
          minuteOpenForm: data.OpenAtMinute,
        });
        this._parkingService.GetListCityAPICallback().then((dataCity) => {
          this.cities = dataCity;
          this.addParkingForm.patchValue({
            cityForm: data.CityId,
          });
          this._parkingService
            .GetListDistrictByCityAPICallback(data.CityId)
            .then((dataDistrict) => {
              console.log(dataDistrict);
              this.districts = dataDistrict;
              this.addParkingForm.patchValue({
                districtForm: data.DistrictId,
              });
              this._parkingService
                .getListWardsAPICallback(data.CityId, data.DistrictId)
                .then((dataWard) => {
                  this.wards = dataWard;
                  this.addParkingForm.patchValue({
                    wardForm: data.WardId,
                  });
                });
            });
        });
      });
    } else {
      this.initCitiesFilter();
    }
  }

  initModeAdd() {
    this._parkingService.getCity.subscribe((data) => {
      this.cities = data;
      this.addParkingForm.patchValue({
        cityForm: this.cities[0]?.city_id,
      });
      this.initFilterDistrictByCity();
    });
    this._parkingService.getDistrict.subscribe((data) => {
      this.districts = data;
      this.addParkingForm.patchValue({
        districtForm: this.districts[0]?.district_id,
      });
      this.initFilterWardByDistrict();
    });
    this._parkingService.getWard.subscribe((data) => {
      this.wards = data;
      this.addParkingForm.patchValue({
        wardForm: this.wards[0]?.ward_id,
      });
    });
  }

  initCitiesFilter() {
    this._parkingService.getListCitiesAPI();
  }

  initFilterDistrictByCity() {
    console.log('select district:' + this.addParkingForm.value.cityForm);
    const cityId = this.addParkingForm.value.cityForm as number;
    if (cityId > 0) {
      this._parkingService.getListDistrictsAPI(cityId);
    }
  }

  initFilterWardByDistrict() {
    const cityId = this.addParkingForm.value.cityForm as number;
    const districtId = this.addParkingForm.value.districtForm as number;
    console.log('select wards:' + this.addParkingForm.value.districtForm);
    if (cityId > 0 && districtId > 0) {
      this._parkingService.getListWardsAPI(cityId, districtId);
    }
  }
  add() {
    const request: AddParkingRequest = {
      address: this.addParkingForm.value.addressForm as string,
      ward_id: this.addParkingForm.value.wardForm as number,
      city_id: this.addParkingForm.value.cityForm as number,
      owner_phone: this.addParkingForm.value.ownerPhoneForm as string,
      parking_phone: this.addParkingForm.value.parkingPhoneForm as string,
      owner_name: this.addParkingForm.value.ownerNameForm as string,
      district_id: this.addParkingForm.value.districtForm as number,
      lat: this.addParkingForm.value.latForm as number,
      lng: this.addParkingForm.value.lngForm as number,
      parking_name: this.addParkingForm.value.parkingNameForm as string,
      parking_types: this.parkingSlotFormValid,
      region_id: 1,
      open_at_hour: this.addParkingForm.value.hourOpenForm as number,
      open_at_minute: this.addParkingForm.value.minuteOpenForm as number,
      close_at_hour: this.addParkingForm.value.hourCloseForm as number,
      close_at_minute: this.addParkingForm.value.minuteCloseForm as number,
    };
    console.log(request);

    this._parkingService
      .AddParkingAPI(request)
      .then((result: APICodeData) => {
        let alertDialogModel: DialogData = {
          title: 'Title',
          message: 'msg',
        };
        if (result.code == 200) {
          alertDialogModel.title = 'Success';
          alertDialogModel.message =
            'Create parking success, go to the listing page to check and approve';
        } else {
          alertDialogModel.title = 'Failure';
          alertDialogModel.message = `${result.message} - [${result.code}]`;
          if (result.code == 401) {
            sessionStorage.removeItem(PARKING_ACCESS_TOKEN);
            this._router.navigate(['/']);
          }
        }
        this.dialog.open(ParkingAlertDialog, {
          data: alertDialogModel,
        });
      })
      .catch((err) => {
        let alertDialogModel: DialogData = {
          title: 'Failure',
          message: 'Create parking fail, contact Tran Quoc Huy',
        };
        this.dialog.open(ParkingAlertDialog, {
          data: alertDialogModel,
        });
      });
  }

  back() {
    this._router.navigate(['/parking']);
  }

  handleEventParkingSlot(request: AddParkingSlotRequest) {
    for (let index = 0; index < this.parkingSlotFormValid.length; index++) {
      if (
        this.parkingSlotFormValid[index].parking_type === request.parking_type
      ) {
        this.parkingSlotFormValid[index] = Object.assign({}, request);
        return;
      }
    }
    this.parkingSlotFormValid.push(request);
  }

  update() {
    const request: UpdateParkingRequest = {
      parking_name: this.addParkingForm.value.parkingNameForm as string,
      parking_phone: this.addParkingForm.value.parkingPhoneForm as string,
      owner_name: this.addParkingForm.value.ownerNameForm as string,
      owner_phone: this.addParkingForm.value.ownerPhoneForm as string,
      city_id: this.addParkingForm.value.cityForm as number,
      district_id: this.addParkingForm.value.districtForm as number,
      ward_id: this.addParkingForm.value.wardForm as number,
      address: this.addParkingForm.value.addressForm as string,
      lat: this.addParkingForm.value.latForm as number,
      lng: this.addParkingForm.value.lngForm as number,
      hour_open: this.addParkingForm.value.hourOpenForm as number,
      hour_close: this.addParkingForm.value.hourCloseForm as number,
      minute_open: this.addParkingForm.value.minuteOpenForm as number,
      minute_close: this.addParkingForm.value.minuteCloseForm as number
    };
    this._parkingService
      .UpdateParkingAPI(this.parkingId, request)
      .then((data) => {
        if (data) {
          let alertDialogModel: DialogData = {
            title: 'Success',
            message: 'Update parking Success',
          };
          this.dialog.open(ParkingAlertDialog, {
            data: alertDialogModel,
          });
        }
      });
  }
}
