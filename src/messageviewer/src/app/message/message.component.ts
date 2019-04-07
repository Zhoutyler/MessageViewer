import { Component, Input, EventEmitter, Output } from '@angular/core';
 
@Component({
  selector: 'message-selector',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
    @Input() userid: string;
    @Input() avatar : string;
    @Input() handle : string;
    @Input() source : string;
    @Input() timestamp : string;
    @Input() content : string;
    @Input() isStarred : boolean;
    @Input() isTrashed: boolean;
    @Output() onStarStatusChange = new EventEmitter<any>();
    @Output() onTrashMessage = new EventEmitter<any>();

    constructor(){}

    onClickStarButton() {
      this.isStarred = !this.isStarred;
      var jsondata = {
        "userid": this.userid,
        "isstarred": this.isStarred
      }
    
      this.onStarStatusChange.emit(jsondata);
    }

    onClickTrashButton() {
      var jsondata = {
        "userid": this.userid,
        "istrashed": true
      }
      this.onTrashMessage.emit(jsondata);
    }
}


