import { Component } from '@angular/core';
import { generateId } from '../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models';
import { StudentsService } from '../../../core/services/students.service';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {


  id: string = '';
  name: string = '';
  lastname: string = '';
  year: string = '';
  courses: string ='';

  displayedColumns: string[] = [
    'id',
    'name',
    'lastname',
    'year',
    'courses',
  ];

  dataSource:Student[] =[];

  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentsService
  ) {
    this.loadStudents();
  }

  

  loadStudents() {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (Students) => {
        this.dataSource = Students;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(): void {
    this.matDialog
      .open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          console.log('RECIBIMOS ESTE VALOR: ', value);

          this.name = value.name;
          this.lastname = value.lastname;
          this.year = value.year;
          this.courses = value.courses;

          value['id'] = generateId(5);
          this.isLoading = true;
          this.studentService.addStudent(value).subscribe({
            next: (Students) => {
              this.dataSource = [...Students];
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        },
      });
  }

  editStudent(editingStudent: Student) {
    this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.studentService
              .editStudentById(editingStudent.id, value)
              .subscribe({
                next: (Students) => {
                  this.dataSource = [...Students];
                },
              });
          }
        },
      });
  }

  deleteStudentById(id: string) {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;

      this.studentService.deleteStudentById(id).subscribe({
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

