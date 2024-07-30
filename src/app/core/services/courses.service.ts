import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../features/dashboard/courses/models';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private MY_DATABASE = [
    {
      id: 'CSS005',
      name: 'CSS Avanzado: Diseño Web Responsivo y Animaciones',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 'UIUX006',
      name: 'Diseño de Interfaces de Usuario (UI) y Experiencia de Usuario (UX)',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 'PY007',
      name: 'Python: Programación para Principiantes',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 'DS008',
      name: 'Ciencia de Datos con Python: Análisis y Visualización',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 'MKT009',
      name: 'Marketing Digital: Estrategias y Herramientas',
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 'FIN010',
      name: 'Finanzas Personales: Control y Planificación',
      endDate: new Date(),
      startDate: new Date(),
    },
  ];

  editCourseById(id: string, update: Course) {
    this.MY_DATABASE = this.MY_DATABASE.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getCourses();
  }

  getCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE);
        observer.complete();
      }, 500);
    });
  }

  addCourse(course: Course): Observable<Course[]> {
    this.MY_DATABASE.push(course);
    return this.getCourses();
  }

  deleteCourseById(id: string): Observable<Course[]> {
    this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
    return this.getCourses();
  }
}
