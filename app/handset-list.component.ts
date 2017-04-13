import { Component,Output,Input, EventEmitter } from '@angular/core';
import { DataHandling } from "./data-handling.service"


@Component({
  selector: 'jm-handset-list',
  templateUrl: 'app/handset-list.component.html',
  styleUrls: ['app/handset-list.component.css']
})

export class HandsetListComponent {
category="";
handsets=[];
constructor(private datahandlingService: DataHandling){

}

ngOnInit(){
this.HandsetSelection(this.category);
}
HandsetSelection(category){
  this.category=category;
  this.datahandlingService.get(category)
  .subscribe(handsets=>{
    this.handsets=handsets;
  });
}


}