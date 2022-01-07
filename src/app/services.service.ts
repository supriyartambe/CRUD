import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{map}from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  
  constructor(private _http : HttpClient){}

  
createPersonDetails(person:any){
  return this._http.post<any>(" http://localhost:3000/person/",person)
  .pipe(map((res:any)=>{
    return res;
  }));
}

getPerson(){
  return this._http.get<any>(" http://localhost:3000/person/")
  .pipe(map((res:any)=>{
    return res;
  }));
}

updatePersonrecords(person:any, id:number)
{
  return this._http.put<any>("http://localhost:3000/person/"+id,person)
  .pipe(map((res:any)=>
  {
    return res;
  }))
}

deletePersonrecords(person:any)
{
  return this._http.delete<any>("http://localhost:3000/person/"+person.id)
  .pipe(map((res:any)=>
  {
    return res;
  }))
}

}