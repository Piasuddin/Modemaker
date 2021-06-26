import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const headerOption = {
  headers: new HttpHeaders({
    'Content-Type': 'Application/json'
  })
}
@Injectable({
  providedIn: "root"
})
export class ProductService{
  url = "http://localhost:60496/api/product"
  constructor(private http: HttpClient){

  }
  search(key: string): Observable<any>{
    return this.http.get(this.url + "/search?key=" + key);
  }
}
