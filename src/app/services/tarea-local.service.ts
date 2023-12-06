import { Injectable } from '@angular/core';
import { Tarea } from '../domain/tarea';
import { TareaFirebaseService } from './tarea-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class TareaLocalService {
  // listaTareas: Tarea[] = [];

  // constructor(private tareaFirebaseService: TareaFirebaseService) {}

  // ngOnInit(): void {
  //   this.loadTareas();
  // }

  // loadTareas() {
  //   // Intenta obtener las tareas localmente
  //   const tareasLocal = this.getTareasLocal();

  //   if (tareasLocal && tareasLocal.length > 0) {
  //     this.listaTareas = tareasLocal;
  //   } else {
  //     // Si no hay tareas locales, obtén las tareas de Firebase
  //     this.tareaFirebaseService.getAndSaveLocally().subscribe((data) => {
  //       this.listaTareas = data;

  //       // Guarda las tareas localmente
  //       this.saveTareasLocal(data);
  //     });
  //   }
  // }

  // getTareasLocal(): Tarea[] | null {
  //   const tareasLocal = localStorage.getItem('tareas');
  //   return tareasLocal ? JSON.parse(tareasLocal) : null;
  // }

  // saveTareasLocal(tareas: Tarea[]): void {
  //   localStorage.setItem('tareas', JSON.stringify(tareas));
  // }
}
