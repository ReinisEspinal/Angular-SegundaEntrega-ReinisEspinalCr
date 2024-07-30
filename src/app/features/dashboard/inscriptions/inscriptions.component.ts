import { Component } from '@angular/core';
import { generateId } from '../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { Inscription } from './models';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss',
})

export class InscriptionsComponent {
  id: string = '';
  studentName: string = '';
  courseName: string = '';
  inscriptionDate: string = '';
  status: string = '';

  displayedColumns: string[] = [
    'id',
    'studentName',
    'courseName',
    'inscriptionDate',
    'status',
  ];

  dataSource: Inscription[] = [];

  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private InscriptionService: InscriptionsService
  ) {
    this.loadInscriptions();
  }

  loadInscriptions() {
    this.isLoading = true;
    this.InscriptionService.getInscriptions().subscribe({
      next: (Inscriptions) => {
        this.dataSource = Inscriptions;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  
 openDialog(): void {
    this.matDialog
      .open(InscriptionDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          console.log('RECIBIMOS ESTE VALOR: ', value);

          this.studentName = value.studentName;
          this.courseName = value.courseName;
          this.inscriptionDate = value.inscriptionDate;
          this.status = value.status;

          value['id'] = generateId(5);
          this.isLoading = true;
          this.InscriptionService.addInscription(value).subscribe({
            next: (Inscriptions) => {
              this.dataSource = [...Inscriptions];
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        },
      });
  }

  editInscription(editingInscription: Inscription) {
    this.matDialog
      .open(InscriptionDialogComponent, { data: editingInscription })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.InscriptionService
              .editInscriptionById(editingInscription.id, value)
              .subscribe({
                next: (Inscriptions) => {
                  this.dataSource = [...Inscriptions];
                },
              });
          }
        },
      });
  }


  deleteStudentById(id: string) {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;

      this.InscriptionService.deleteStudentById(id).subscribe({
        next: (Students) => {
          this.dataSource = [...Students];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
