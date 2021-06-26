import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
const headerOption = {
  headers: new HttpHeaders({
    'Content-Type': 'Application/json'
  })
}
@Injectable()
export class OrderService{
  url = "http://localhost:60496/api/order"
  constructor(private http: HttpClient){

  }
  save(info): Observable<any>{
    return this.http.post(this.url, info, headerOption);
  }
  update(info): Observable<any>{
    return this.http.put(this.url, info, headerOption);
  }
  getList(): Observable<any>{
    return this.http.get(this.url);
  }
  getById(id): Observable<any>{
    return this.http.get(this.url + "/getById?id=" + id);
  }
  delete(id): Observable<any>{
    return this.http.delete(this.url + "/delete?id=" + id);
  }
  reportView(id): Observable<any>{
    return this.http.get(this.url + "/report?id=" + id);
  }
}
