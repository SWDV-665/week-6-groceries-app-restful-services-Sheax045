import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/observable"
import {map, catchError  }  from "rxjs/operators"

import { Subject } from "rxjs"

@Injectable()
export class GroceriesServiceService {

  items: any = []; 
  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseUrl = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log("Hello groceriesServiceProvider Provider");
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

   getItems(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }
  private extractData(res: Response){
    let body = res;
    return body || {}
  }
  private handleError(error: Response | any){
    return Observable.throw(error.status)
   }
  removeItem(id) {
    this.http.delete(this.baseUrl + '/api/groceries/'+id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true)
    })
  }
  addItem(item){
    this.http.post(this.baseUrl + '/api/groceries',item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true)
    })
  }

  editItem(item, index){
    console.log(item)
    this.http.put(this.baseUrl + '/api/groceries/'+item._id,item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true)
    })

  }


}
  //getItems() {
    //return this.items
  //}

  //removeItem(index){
    //this.items.splice(index, 1);
  //}

  //addItem(item) {
    //this.items.push(item);
  //}

  //editItem(item, index){
    //this.items[index] = item;
  //}

