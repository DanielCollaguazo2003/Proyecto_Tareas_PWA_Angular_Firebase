import { Component } from '@angular/core';
import { TareaFirebaseService } from 'src/app/services/tarea-firebase.service';
import { Tarea } from '../../domain/tarea';
import { NavigationExtras, Router } from '@angular/router';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent {
  listaTareas: Tarea[] = [];

  constructor(private _tareaFirebaseService: TareaFirebaseService,
     private router: Router,
     private _tareaService: TareaService){
    this._tareaFirebaseService.getAll().subscribe(data => {
      this.listaTareas = data;
    });;
  }

  verTarea(tarea: Tarea){
    console.log("editando", tarea)
    this._tareaService.setTarea(tarea);

  }

  eliminarTarea(tarea: Tarea){
    this._tareaFirebaseService.delete(tarea);
  }
}
