import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  login(){
    window.alert(this.loginForm.value.phoneForm + " " + this.loginForm.value.passwordForm)
  }

}
