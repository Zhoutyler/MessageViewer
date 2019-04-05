import { Component } from '@angular/core';
import { MessagesService } from './messages.service'
 
@Component({
  selector: 'messages-selector',
  templateUrl: './messages.component.html',
  providers: [MessagesService]
})
export class MessagesComponent {
    messages = [];
    constructor(private messagesService : MessagesService) {
        this.updateMessages();
    }
    updateMessages() {
        this.messagesService.getMessages().subscribe(result => {
            console.log (result);
            for (var i = 0; i < Object.keys(result).length; i++)
                this.messages.push(result[i]);
            
        }, error => {
            console.log("Get Messages Failed: ", error);
        }
        );
    }
}