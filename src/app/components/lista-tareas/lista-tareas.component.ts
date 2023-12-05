import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TareaFirebaseService } from 'src/app/services/tarea-firebase.service';
import { Tarea } from '../../domain/tarea';
import { NavigationExtras, Router } from '@angular/router';
import { TareaService } from 'src/app/services/tarea.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit, OnDestroy {
  listaTareas: Tarea[] = [];
  private scrollSubscription: Subscription | undefined;
  constructor(private _tareaFirebaseService: TareaFirebaseService,
    private elementRef: ElementRef,
     private router: Router,
     private renderer: Renderer2,
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

  ngOnInit() {
    this.scrollSubscription = this._tareaService.scrollEvent$.subscribe(() => {
      this.scrollIntoView();
    });
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  scrollIntoView() {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
