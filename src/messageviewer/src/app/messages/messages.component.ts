import { Component } from '@angular/core';
import { MessagesService } from './messages.service'
 
@Component({
    selector: 'messages-selector',
    templateUrl: './messages.component.html',
    providers: [MessagesService],
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
    messages = [];
    starCount;
    viewUntrashed = true;
    input = "";

    constructor(private messagesService : MessagesService) {
        this.updateMessages();
        this.updateStarCount();
    }

    updateMessages() {
        this.messagesService.getMessages().subscribe(result => {
            console.log (result);
            this.insertMessages(result);
            
        }, error => {
            console.log("Get Messages Failed: ", error);
        }
        );
    }

    insertMessages(result : any) {
        this.messages = [];
        for (var i = 0; i < Object.keys(result).length; i++) {
            result[i].timestamp = new Date(result[i].timestamp).toLocaleString('en-us', { 
                month: 'long', day: '2-digit', year: 'numeric'});
            result[i].query = "";
            this.messages.push(result[i]);
        }
    }

    updateStarCount() {
        this.messagesService.getStarCount().subscribe(result => {
            console.log('star count is ', result);
            this.starCount = result[0].starCount;
        }, error => {
            console.log("Error is ", error);
            this.starCount = 0;
        });
    }

    StarStatusChanged(jsondata : any) {
        this.messagesService.putStarStatus(jsondata).subscribe(result => {
            console.log(result);
            this.updateStarCount();
        }, error => {
            console.log("Change Star Status Failed: ", error);
        });
    }

    TrashMessage(jsondata : any) {
        console.log(jsondata);
        this.messagesService.putTrashStatus(jsondata).subscribe(result => {
            console.log(result);
            this.updateMessages();
        }, error => {
            console.log("Change Trash Status Failed: ", error);
        });
    }

    onClickViewButton() {
        this.viewUntrashed = !this.viewUntrashed;
    }
    
    onClickSortButton() {
        this.messagesService.putSort().subscribe(result => {
            this.insertMessages(result);
        }, error=> {
            console.log("Sort Messages Failed: ", error);
        });
    }
    
    
    onClickSearchButton() {
        this.messagesService.getMatchedID(this.input).subscribe(result => {
            for (var i = 0; i < this.messages.length; i++) {
                for (var j = 0; j < Object.keys(result).length; j++) {
                    if (this.messages[i].userid == result[j].userid) {
                        this.messages[i].query = this.input;
                        break;
                    }
                }
                if (this.messages[i].query != this.input)
                    this.messages[i].query = "";
            }
            console.log(result);
        }, error => {
            console.log("Search Failed: ", error);
        })
    }
}