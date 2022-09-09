import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingRoutingModule } from './parking-routing.module';
import { SearchComponent } from './search/search.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AddComponent } from './add/add.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [SearchComponent, AddComponent],
  imports: [
    ParkingRoutingModule,
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ParkingModule { }
