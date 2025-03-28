import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/Services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',//selector appel de membreComponent 
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  dataSource :any[]=[]
  //injection de dependance :mecanisme qui permet d'appeler (injection) le service dans le composant
  constructor(private MS:MemberService,private dialog:MatDialog){}
  ngOnInit(): void {//fonction lance automatiquement 
    this.MS.GetAllMembers().subscribe((data)=>{
      //action
      this.dataSource=data
    })//entre view et service 
  }
  delete(id: string):void {//passage 1 et 4
    //1 ouvrirla boite (ConfirmDialogComponent)
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '600px',
    });
    //2 attendre la resultat click de user 
    //3 si click= confirm =>effacer 
    dialogRef.afterClosed().subscribe(result => {
      if(result) 
      {
        this.MS.deleteMember(id).subscribe(()=>{
      
          this.MS.GetAllMembers().subscribe((data)=>{
      
            this.dataSource=data
          })
      
        })
      } 
    });
    
  }
  displayedColumns: string[] = ['ID', 'CIN', 'Name', 'Type','createdate','icon'];
}
