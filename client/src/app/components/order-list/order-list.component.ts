import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'pono', 'podate', 'supplier', 'exdate', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private orderService: OrderService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.orderService.getList().subscribe(e => {
      console.log(e);
      if (e) {
        this.dataSource.data = e;
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onDelete(id: number) {
    this.orderService.delete(id).subscribe(e => {
      if (e.statusCode == 204) {
        this.dataSource.data.splice(this.dataSource.data.findIndex(e => e.id == id), 1);
        this.dataSource.data = this.dataSource.data;
        this.matSnackBar.open("Order deleted successfull", "OK", { duration: 5000 });
      }
    })
  }
  onReport(id: number) {
    this.orderService.reportView(id).subscribe(e => {
      console.log(e);
      const linkSource = `data:application/pdf;base64,${e.fileContents}`;
      const downloadLink = document.createElement("a");
      const fileName = "abc.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
