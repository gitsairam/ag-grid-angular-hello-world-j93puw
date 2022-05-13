import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columnDefs = [
    { field: 'name', sortable: true },
    { field: 'market_cap' },
    {
      field: 'image',
      cellRenderer: (data) => {
        console.log(data.value);
        return `<img src=${data.value} alt='coin logo' style=width:80%;height:80% />`;
      },
    },
    { field: 'symbol', filter: true },
    { field: 'current_price' },
  ];
  gridApi: GridApi;
  currency = 'INR';
  constructor(private http: HttpClient) {}

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  // ];

  onGridReady(event: any) {
    this.gridApi = event.api;

    this.http
      .get<Object[]>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.currency}&order=market_cap_desc&per_page=300&page=1&sparkline=false`
      )
      .subscribe((data) => {
        //console.log(data);
        this.gridApi.setRowData(data);
        this.gridApi.sizeColumnsToFit();
      });
  }

  clickRow(event: any) {}
}
