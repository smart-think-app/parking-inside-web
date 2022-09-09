import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ParkingService } from 'src/app/services/parking.service';
import { LoginRequest } from './../../../model/proxy_model/parking/parking_model';
import {MatDialog} from '@angular/material/dialog';
import { ParkingAlertDialog } from 'src/app/core/components/alert_dialog/alert_dialog.component';
import { DialogData } from 'src/app/model/component_model/alert_dialog_data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phoneForm = new FormControl('',[Validators.required])
  passwordForm = new FormControl('' , [Validators.required])

  loginForm = this.formBuilder.group({
    phoneForm: this.phoneForm,
    passwordForm: this.passwordForm
  })
  constructor(
    private formBuilder:FormBuilder,
    private parkingSvc: ParkingService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login(){
    let alertDialogModel: DialogData = {
      title:"title",
      message:"message"
    }
    const request: LoginRequest = {
      phone :  this.loginForm.value.phoneForm as string,
      password: this.loginForm.value.passwordForm as string
    };
   
    this.parkingSvc.login(request).then(data => {
      this.router.navigate(["/parking"])
    }).catch(err => {
      console.log(err)
      alertDialogModel.title = "Alert"
      alertDialogModel.message = "Login Fail"
      this.dialog.open(ParkingAlertDialog,{
        data: alertDialogModel
      })
    })
  }

}
