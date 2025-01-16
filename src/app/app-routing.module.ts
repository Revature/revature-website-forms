import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourcingFormComponent } from './sourcing-form/sourcing-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RecruitmentFormComponent } from './recruitment-form/recruitment-form.component';
import { B2cFormComponent } from './b2c-form/b2c-form.component';

const routes: Routes = [
  {path:'sourcing-form', component: SourcingFormComponent},
  {path:'recruitment-form', component: RecruitmentFormComponent},
  {path:'b2c-form', component: B2cFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
