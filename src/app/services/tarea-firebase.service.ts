import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Tarea } from '../domain/tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaFirebaseService {

  /* Variables */
    /* Variables necesarias para subir nustros datos al firebase*/
  private path = '/tareas'

  contactosRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) {
    this.contactosRef = db.collection(this.path)

    this.contactosRef.valueChanges().subscribe(data => {
      console.log(data)
    })
  }

  /* Metodo que devueleve un observable y hace referencia a la coelccion de datos del firebase */
  getAll(): Observable<Tarea[]>{
    return this.contactosRef.valueChanges();
  }

  /* Metodo para buscar una tarea dentro del firebase mediante una ID y devolver una Tarea como tal */
  buscarTarea(tareaid: string){
    let listaTareas: Tarea[] = [];
    let tarea: Tarea;
    this.contactosRef.valueChanges().subscribe(data => {
      listaTareas = data;
    })
    for (let index = 0; index < listaTareas.length; index++) {
      if (tareaid === listaTareas[index].uid) {
         tarea = listaTareas[index];
         return tarea;
      }
    }
    return;
  }

  /* Metodo para guardar una tarea en el firebase el .set guarda */
  save(tarea: Tarea){
    const uid = this.db.createId()
    tarea.uid = uid
    return this.contactosRef.doc(uid).set(Object.assign({}, tarea));
  }

  /* MEtodo para actualizar una tarea del firebase, el .update actualiza */
  update(tarea: Tarea){
    return this.contactosRef.doc(tarea.uid).update(Object.assign({}, tarea));
  }

  /* Metodo para eliminar una tarea del firebase el .delete elimina*/
  delete(tarea: Tarea){
    return this.contactosRef.doc(tarea.uid).delete();
  }

  /* Metodo para obtener una tarea */
  getTarea(uid: string){
    return this.db.doc(this.path+'/'+uid).get()
  }

  /* Metodo para generar un UID de Firebase */
  generateUid(){
    const uid = this.db.createId();
    return uid;
  }

}
