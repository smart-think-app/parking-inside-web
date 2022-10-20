import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ParkingModel } from 'src/app/model/proxy_model/parking/parking_model';
import { Router } from '@angular/router';
import { ParkingModelPaging } from './../../../model/proxy_model/parking/parking_model';
import { ParkingService } from 'src/app/services/parking.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/model/component_model/alert_dialog_data';
import { ParkingAlertDialog } from 'src/app/core/components/alert_dialog/alert_dialog.component';
import { initializeApp } from "firebase/app";
import { getMessaging,getToken,onMessage    } from "firebase/messaging";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  parkingPaging: ParkingModelPaging = {
    IsLastPage: false,
    PageIndex:0,
    PageLimit:0,
    Total:0,
    Parks:[]
  }
  color = "red"
  displayedColumns: string[] = ['select', 'name','id',
  'phone', 'status','action','edit'];
  dataSource = new MatTableDataSource<ParkingModel>([]);
  pageSizeOptions: number[] = [5, 10, 25, 100];
  selection = new SelectionModel<ParkingModel>(true, []);
  pageEvent: PageEvent = {
    length: this.parkingPaging.Total,
    pageSize: this.pageSizeOptions[0],
    pageIndex: 0
  };
  add(){
    this.router.navigate(['parking/add'])
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  clearSelectAll() {
    this.selection.clear()
  }
  initFcmToken() {
    const firebaseConfig = {
      apiKey: "AIzaSyBkg5rrqmC7kV4DK-Og_wk2tCR5uLrCwGk",
      authDomain: "parking-4292e.firebaseapp.com",
      projectId: "parking-4292e",
      storageBucket: "parking-4292e.appspot.com",
      messagingSenderId: "460591389535",
      appId: "1:460591389535:web:90a4e9d6bf112f644f74ea",
      measurementId: "G-1W0Z34FJW2"
    };
  
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    getToken(messaging, { vapidKey: environment.vapid_firebase_key}).then((currentToken) => {
      if (currentToken) {
        console.log("fcm_token")
        console.log(currentToken)
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ParkingModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Index + 1}`;
  }
  constructor(
    private router: Router,
    private _parkingService: ParkingService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this._parkingService.getParkingPaging.subscribe((data) => {
      this.parkingPaging = data;
      this.dataSource.data = this.parkingPaging.Parks
    })
    this.initPaging()
    this.initFcmToken()
  }

  initPaging() {
    console.log(this.pageEvent)
    this._parkingService.GetListParkingAPI({
      page_index: this.pageEvent.pageIndex,
      page_limit: this.pageEvent.pageSize
    })
  }

  refreshPage(isRefresh: boolean) {
    console.log(this.pageEvent)
    if (isRefresh) {
      this.changePaging(this.pageEvent)
    }
  }

  public changePaging(event: PageEvent) {
    this.clearSelectAll()
    this._parkingService.GetListParkingAPI({
      page_index: event.pageIndex,
      page_limit: event.pageSize
    })
    return event;
  }

  changeColorStatus(item: ParkingModel): string {
    switch(item.Status){
      case 1:
        return "white"
      case 2:
        return "rgb(36, 255, 36)"
      case 5:
        return "red"
      default:
        return "white"
    }
  }

  approveMulti() {
    console.log(this.selection.selected)
    const parkingIds = this.selection.selected.map((data) => {
      return data.Id
    })
    if (parkingIds.length == 0) {
      return
    }
    let alertDialogModel: DialogData = {
      title:"Title",
      message:"msg"
    }
    this._parkingService.ApproveMultiAPI(parkingIds).then((result) => {
      if (result.code == 200) {
        alertDialogModel.title = 'Success'
        alertDialogModel.message = 'Approve multi parking success'
        this.refreshPage(true)
      } else {
        alertDialogModel.title = 'Failure'
        alertDialogModel.message = `${result.message} - [${result.code}]`
      }
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    }).catch(err => {
      let alertDialogModel: DialogData = {
        title:"Failure",
        message:"Create parking fail, contact Tran Quoc Huy"
      }
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    })
  }

  checkVerhiceCar(data: number[]) {
    return  data.indexOf(1) >= 0
  }

  checkVerhiceMotorbike(data: number[]) {
    return data.indexOf(2) >= 0
  }

  gotoEdit(parkingId: number) {
    console.log("click edit")
    this.router.navigate([`parking/edit/${parkingId}`])
  }

  syncESMulti() {
    console.log(this.selection.selected)
    const parkingIds = this.selection.selected.map((data) => {
      return data.Id
    })
    if (parkingIds.length == 0) {
      return
    }
    let alertDialogModel: DialogData = {
      title:"Title",
      message:"msg"
    }
    this._parkingService.SyncMultiESAPI(parkingIds).then((result) => {
      if (result.code == 200) {
        alertDialogModel.title = 'Success'
        alertDialogModel.message = 'sync multi parking success'
        this.refreshPage(true)
      } else {
        alertDialogModel.title = 'Failure'
        alertDialogModel.message = `${result.message} - [${result.code}]`
      }
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    }).catch(err => {
      let alertDialogModel: DialogData = {
        title:"Failure",
        message:"Create parking fail, contact Tran Quoc Huy"
      }
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    })
  }
}
