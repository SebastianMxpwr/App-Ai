import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageaiService {

  constructor(private http: HttpClient) { }


  sendPromp(prompt: string){
    return this.http.post(environment.baseUrl+ environment.imagesai, {prompt})
  }
}
