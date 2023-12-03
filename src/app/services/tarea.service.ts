import { Injectable } from '@angular/core';
import { Tarea } from '../domain/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tarea: Tarea[] = [];

  constructor() { }
}
