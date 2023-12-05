import { Injectable } from '@angular/core';
import { Tarea } from '../domain/tarea';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tarea?: Tarea;

  constructor() {
    this.tareaSubject.next(null);
  }

  private tareaSubject = new BehaviorSubject<Tarea | null>(null);

  tarea$ = this.tareaSubject.asObservable();

  getTarea(){
    return this.tareaSubject.value;
  }

  setTarea(tarea: Tarea){
    this.tareaSubject.next(tarea);
  }
  private scrollSubject = new Subject<void>();

  scrollEvent$ = this.scrollSubject.asObservable();

  triggerScroll() {
    this.scrollSubject.next();
  }
}
