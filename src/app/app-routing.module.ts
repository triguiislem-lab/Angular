import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ToolComponent } from './tool/tool.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path:'',
pathMatch:'full',
    component:MemberComponent
  },{
    path:'create',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {
    path:'member',
    pathMatch:'full',
    component:MemberComponent
  },
  {
    path:'edit/:id',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {
    
      path:'dashboard',
      pathMatch:'full',
      component:DashbordComponent
    
  },
  {
    path:'tools',
    pathMatch:'full',
    component:ToolComponent
  },
  {
    path:'events',
    pathMatch:'full',
    component:EventComponent
  },
  {
    path:'articles',
    pathMatch:'full',
    component:ArticleComponent
  },
  {
    path:'**',
    component:MemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
