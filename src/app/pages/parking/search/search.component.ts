import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ParkingModel } from 'src/app/model/proxy_model/parking/parking_model';


const ELEMENT_DATA: ParkingModel[] = [
  {id: 1, parking_name: 'Hydrogen', parking_phone: "1.0079", status: 1,index:1,},
  {id: 1, parking_name: 'Hydrogen', parking_phone: "1.0079", status: 1,index:2,},
  {id: 1, parking_name: 'Hydrogen', parking_phone: "1.0079", status: 1,index:3,},
  {id: 1, parking_name: 'Hydrogen', parking_phone: "1.0079", status: 1,index:4,},
];


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['select','id', 'name', 'phone', 'status'];
  dataSource = new MatTableDataSource<ParkingModel>(ELEMENT_DATA);
  selection = new SelectionModel<ParkingModel>(true, []);

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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ParkingModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
