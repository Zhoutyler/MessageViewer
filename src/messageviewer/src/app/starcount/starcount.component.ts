import { Component } from '@angular/core';
import { StarCountService } from './starcount.service'
 
@Component({
  selector: 'starcount-selector',
  templateUrl: './starcount.component.html',
  providers: [StarCountService]
})
export class StarCountComponent {
   starCount;
   constructor(private starCountServie : StarCountService) {
       this.starCountServie.getStarCount().subscribe(result => {
           console.log('star count is ', result);
           this.starCount = result[0].starCount;
       }, error => {
           console.log("Error is ", error);
           this.starCount = 0;
       });
       
   }
}