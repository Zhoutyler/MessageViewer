import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'message-selector',
  templateUrl: './message.component.html'
})
export class MessageComponent {
    @Input() avatar : string;
    @Input() handle : string;
    @Input() source : string;
    @Input() timestamp : string;
    @Input() content : string;
    @Input() starred : string;

    constructor(){}

}


