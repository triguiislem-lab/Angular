import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PubComponent } from './pub/pub.component';

const routes: Routes = [
  {
    path: 'members',
    component: MemberComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'tools',
    component: ToolsComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {path:"pub",component:PubComponent},
  { path: 'login', component: LoginComponent }, // route vers la page de connexion

  // Redirection par défaut (optionnel)
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Page 404 (optionnel)
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
