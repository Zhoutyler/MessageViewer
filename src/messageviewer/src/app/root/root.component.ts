import { Component } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['root.component.css']
})
export class RootComponent {
  ss = []
   addtext() {
    this.ss.push('a');
   }
}