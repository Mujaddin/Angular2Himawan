import { DataHandling } from "./data-handling.service";
import{Input,Component, EventEmitter} from "@angular/core";

@Component({
  selector:'jm-handset-detail',
  templateUrl:'app/handset-detail.component.html',
  styleUrls:['app/handset-detail.component.css']
})

export class HandsetDetail{
  @Input() handset;
  
}