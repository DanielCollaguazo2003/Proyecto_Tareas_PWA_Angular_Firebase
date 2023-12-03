import { Component } from '@angular/core';
import { TareaFirebaseService } from 'src/app/services/tarea-firebase.service';
import { Tarea } from '../../domain/tarea';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent {
  listaTareas: Tarea[] = [];

  constructor(private _tareaFirebaseService: TareaFirebaseService){
    this._tareaFirebaseService.getAll().subscribe(data => {
      this.listaTareas = data;
    });;
  }

  
}
