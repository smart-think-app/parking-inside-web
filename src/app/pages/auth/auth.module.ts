import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ParkingService } from 'src/app/services/parking.service';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers:[
    ParkingService
  ]
})
export class AuthModule { }
