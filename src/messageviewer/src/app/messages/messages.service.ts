import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class MessagesService {
 
    constructor(private http: HttpClient){
        
    }
    getMessages() {
        console.log("Start to get");
        return this.http.get('/api/messages/get', {});
    }
 
}