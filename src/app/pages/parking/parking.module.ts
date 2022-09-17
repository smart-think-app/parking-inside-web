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
import { HttpClientModule } from '@angular/common/http';
import { ParkingService } from 'src/app/services/parking.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionIconMenuComponent } from './search/components/action-icon-menu/action-icon-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableParkingSlotComponent } from './add/components/table-parking-slot/table-parking-slot.component';
import { UpdateParkingSlotModalComponent } from './add/components/update-parking-slot-modal/update-parking-slot-modal.component';
import { ParkingSlotService } from 'src/app/services/parking-slot.service';
@NgModule({
  declarations: [SearchComponent, AddComponent, ActionIconMenuComponent, TableParkingSlotComponent, UpdateParkingSlotModalComponent],
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
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatRadioModule,
  ],
  providers:[
    ParkingService,
    ParkingSlotService
  ]
})
export class ParkingModule { }
