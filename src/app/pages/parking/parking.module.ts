import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingRoutingModule } from './parking-routing.module';
import { SearchComponent } from './search/search.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [SearchComponent],
  imports: [
    ParkingRoutingModule,
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class ParkingModule { }
