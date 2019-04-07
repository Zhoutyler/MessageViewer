import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class MessagesService {
 
    constructor(private http: HttpClient){
        
    }
    getMessages() {
        console.log("Start to get");
        return this.http.get('/api/get/messages', {});
    }
    
    getStarCount() {
        console.log("Start to get");
        return this.http.get('/api/get/star', {});
    }

    putStarStatus(jsondata: any) {
        console.log("Star status changed ", jsondata);
        return this.http.put('/api/put/starstatus', {
            "userid": jsondata.userid,
            "isstarred": jsondata.isstarred
        })
    }

    putTrashStatus(jsondata: any) {
        console.log("Trash status changed ", jsondata);
        return this.http.put('/api/put/trashstatus', {
            "userid": jsondata.userid,
            "istrashed": jsondata.istrashed
        })       
    }

    putSort() {
        return this.http.put('/api/put/sort', {
        });
    }
}