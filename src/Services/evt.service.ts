import { Injectable } from '@angular/core';
import { Evt } from 'src/Models/Evt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//bech tejem tamil service 
@Injectable({
  providedIn: 'root'//peux appeler a tous projet testamlou fi composant wala autre service 
})
export class EvtService {
 



  constructor(private http:HttpClient){}
  getAllEvents(){
    return this.http.get<Evt[]>('http://localhost:3000/Evt')

  }

  addEvent(evt:Evt ):Observable<void>{
    return this.http.post<void>('http://localhost:3000/Evt',evt)
  }
  getEventById(id:string):Observable<Evt>{
    return this.http.get<Evt>('http://localhost:3000/Evt/'+id)
  }
  updateEvent(id:string,evt:Evt):Observable<void>{
    return this.http.put<void>('http://localhost:3000/Evt/'+id,evt)
  }
  fetchEvent(){
    return this.http.get<Evt[]>('http://localhost:3000/Evt')
  }
  deleteEvent(id:string):Observable<void>{
    return this.http.delete<void>('http://localhost:3000/Evt/'+id)
    }
   
}
