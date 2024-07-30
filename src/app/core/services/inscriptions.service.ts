import { Injectable } from '@angular/core';
import { Inscription } from '../../features/dashboard/inscriptions/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  constructor() {}

  private MY_DATABASE = [
    {
      id: '12345',
      studentName: 'Alice Johnson', // Combinamos nombre y apellido
      courseName: 'Mathematics', // Solo un curso por inscripción
      inscriptionDate: '2024-07-29', // Fecha actual como ejemplo
      status: 'Approved',
    },
    {
      id: '67890',
      studentName: 'Bob Smith',
      courseName: 'Physics',
      inscriptionDate: '2024-07-28',
      status: 'Pending',
    },
    {
      id: '54321',
      studentName: 'Eva Brown',
      courseName: 'Biology',
      inscriptionDate: '2024-07-27',
      status: 'Rejected',
    },
  ];

  getInscriptions(): Observable<Inscription[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE);
        observer.complete();
      }, 500);
    });
  }

  addInscription(inscription: Inscription): Observable<Inscription[]> {
    console.log(inscription);
    this.MY_DATABASE.push(inscription);
    return this.getInscriptions();
  }

  editInscriptionById(id: string, update: Inscription) {
    this.MY_DATABASE = this.MY_DATABASE.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getInscriptions();
  }

  deleteStudentById(id: string): Observable<Inscription[]> {
    this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
    return this.getInscriptions();
  }
}
