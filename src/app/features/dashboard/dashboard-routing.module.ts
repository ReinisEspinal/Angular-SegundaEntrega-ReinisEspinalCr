import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
 
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [
      { path: 'courses', component: CoursesComponent },   
      { path: 'students', component: StudentsComponent },
      { path: 'inscriptions', component: InscriptionsComponent },
      { path: '', redirectTo: 'courses', pathMatch: 'full' } // Redirige a /dashboard/courses por defecto
    ],
  },
  
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}