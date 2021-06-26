import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSideNavOpen = true;
  constructor() {
  }
  ngOnInit() {
  }
  onMenuClick(){
    this.isSideNavOpen = !this.isSideNavOpen;
  }
}
