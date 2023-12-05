import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Tarea } from '../domain/tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaFirebaseService {

  private path = '/tareas'

  contactosRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) {
    this.contactosRef = db.collection(this.path)

    this.contactosRef.valueChanges().subscribe(data => {
      console.log(data)
    })
  }

  getAll(): Observable<Tarea[]>{
    return this.contactosRef.valueChanges();
  }

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

  save(tarea: Tarea){
    const uid = this.db.createId()
    tarea.uid = uid
    console.log('Tarea', tarea)
    return this.contactosRef.doc(uid).set(Object.assign({}, tarea));
  }

  update(tarea: Tarea){
    return this.contactosRef.doc(tarea.uid).update(Object.assign({}, tarea));
  }

  delete(tarea: Tarea){
    return this.contactosRef.doc(tarea.uid).delete();
  }

  getTarea(uid: string){
    console.log('uid', uid)
    return this.db.doc(this.path+'/'+uid).get()
  }

  generateUid(){
    const uid = this.db.createId();
    return uid;
  }

}
