import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class StarCountService {
 
    constructor(private http: HttpClient){
        
    }
    getStarCount() {
        console.log("Start to get");
        return this.http.get('/api/star/getstar', {});
    }
 
}