import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageServiceService {
  configUrl = 'https://randomuser.me/api/?gender=';
  constructor(private http: HttpClient) { }


  getImage(gender) {
    return this.http.get(this.configUrl + gender);
  }
}


