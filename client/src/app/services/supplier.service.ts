import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SupplierService{
  url = "http://localhost:60496/api/supplier"
  constructor(private http: HttpClient){

  }
  getList(): Observable<any>{
    return this.http.get(this.url);
  }
}
