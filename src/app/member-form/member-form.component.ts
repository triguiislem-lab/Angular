import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent {
  //injection de dependance
  constructor(private MS:MemberService,private router :Router,private activateRoute:ActivatedRoute )
  {}
  
form !:FormGroup;
//intialiser les valeur par defaut null
ngOnInit(){
  //recuprer la route active 
  const idcourant=this.activateRoute.snapshot.params['id']//recuperer id
  console.log("idcourant",idcourant)
  if(idcourant){
this.MS.getMumberById(idcourant).subscribe((a)=>{
  this.form=new FormGroup({
    cin:new FormControl(a.cin),
    name:new FormControl(a.name),
    type:new FormControl(a.type),
    createdate:new FormControl(a.createdate)
})
})
  }else{ this.form=new FormGroup({
    cin:new FormControl(null),
    name:new FormControl(null),
    type:new FormControl(null),
    createdate:new FormControl(null),
      })}
  //chercher id dans la route
  //si id existe et une valeur je suis dans edit 
  //sinon je suis dans create 
 
}
sub(){
  const idcourant=this.activateRoute.snapshot.params['id']
  if(idcourant)//on utiliser update
    {
      this.MS.updateMember(idcourant,this.form.value).subscribe(()=>{
        this.router.navigate([''])
      })
    }
  else{//utiliser ajouter 
  console.log(this.form.value)//passage 1 et 4 
  this.MS.addMember(this.form.value).subscribe(()=>{
    this.router.navigate([''])
})
  }
}
}
