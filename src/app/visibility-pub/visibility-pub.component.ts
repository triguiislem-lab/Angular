import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evt } from 'src/Models/Evt';
import { EvtService } from 'src/Services/evt.service';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility-pub.component.html',
  styleUrls: ['./visibility-pub.component.css']
})
export class VisibilityPubComponent {
//forsage de type 
evt!:Evt
constructor(public MatDialogRef:MatDialogRef<VisibilityPubComponent>,@Inject(MAT_DIALOG_DATA)data :any,private ES:EvtService){
console.log("dataRecupere",data)
// rechercher by id 
this.ES.getEventById(data).subscribe((a)=>{
  this.evt=a
  console.log("evt",this.evt)
  })
}
}