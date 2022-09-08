import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ParkingService } from 'src/app/services/parking.service';
import { LoginRequest } from './../../../model/proxy_model/parking/parking_model';
import { IsNullEmptyUndefined } from './../../../core/utils/utils';

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
    private parkingSvc: ParkingService
    ) { }

  ngOnInit(): void {
  }

  login(){
    const request: LoginRequest = {
      phone :  this.loginForm.value.phoneForm as string,
      password: this.loginForm.value.passwordForm as string
    };
   
    this.parkingSvc.login(request).then(data => {
    }).catch(err => {
    })
  }

}
