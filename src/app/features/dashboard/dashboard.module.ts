import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesModule } from './courses/courses.module';

import { StudentsModule } from './students/students.module';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';

import { InscriptionDialogComponent } from './inscriptions/components/inscription-dialog/inscription-dialog.component';

@NgModule({
  declarations: [DashboardComponent, InscriptionsComponent, InscriptionDialogComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoursesModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    StudentsModule,
    MatProgressSpinnerModule
  ],
})
export class DashboardModule {}
