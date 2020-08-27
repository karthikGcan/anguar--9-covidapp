import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasesComponent } from './cases/cases.component';
import { CasesDetailsComponent } from './cases-details/cases-details.component';
import { AddCasesComponent } from './add-cases/add-cases.component';
import { EditCasesComponent } from './edit-cases/edit-cases.component';
import { CasesStatComponent } from './cases-stat/cases-stat.component';


const routes: Routes = [
  {
    path : 'cases',
    component: CasesComponent,
    data : {title :'list of cases'}
  },
  {
    path : 'cases-details/:id',
    component: CasesDetailsComponent,
    data : {title :' cases details'}
  },
  {
    path : 'cases-stat',
    component:  CasesStatComponent ,
    data : {title :' cases statistic'}
  },
  {
    path : 'edit-cases/:id',
    component:  EditCasesComponent ,
    data : {title :' edit cases'}
  },
  {
    path : 'add-cases',
    component: AddCasesComponent  ,
    data : {title :' add cases'}
  },
  {
    path : '',
    redirectTo: '/cases',
    pathMatch : 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
