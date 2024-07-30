import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../features/dashboard/students/models';


@Injectable({
  providedIn: 'root'
})
export class StudentsService  {
  private MY_DATABASE = [ {
    id: '12345',
    name: 'Alice',
    lastname: 'Johnson',
    year: "40",
    courses: 'Mathematics, Computer Science, English Literature'
  },
  {
    id: '67890',
    name: 'Bob',
    lastname: 'Smith',
    year: "10",
    courses: 'Physics, Chemistry, History'
  },
  {
    id: '54321',
    name: 'Eva',
    lastname: 'Brown',
    year: "22",
    courses: 'Biology, Art, Spanish'
  }];

  editStudentById(id: string, update: Student) {
    this.MY_DATABASE = this.MY_DATABASE.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getStudents();
  }

  getStudents(): Observable<Student[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE);
        observer.complete();
      }, 500);
    });
  }

  addStudent(Student: Student): Observable<Student[]> {
    console.log(Student)
    this.MY_DATABASE.push(Student);
    return this.getStudents();
  }

  deleteStudentById(id: string): Observable<Student[]> {
    this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
    return this.getStudents();
  }
}