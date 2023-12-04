import { EventEmitter, Injectable } from '@angular/core';
import { Etiqueta } from '../domain/etiqueta';

@Injectable({
  providedIn: 'root'
})
export class ModalEtiquetaService {
  etiquetas: Etiqueta[] = [];
  etiquetasTotales: Etiqueta[] = [];
  constructor() {
  }


  // Vamos a crear un objeto que se encargue de observar si se abre o no el modal que es la ventana de las etiquetas
  $modal = new EventEmitter<any>();

  //Recuperar etiquetas
  getEtiquetas() {
    return this.etiquetas;
  }
  setEtiquetas(etiquetas: Etiqueta[]) {
    this.etiquetas = etiquetas;
  }
  //Agregar una etiqueta
  addEtiqueta(etiqueta: Etiqueta) {
    let encontrada: boolean = false;
    this.etiquetas.push(etiqueta);
    this.obtenerTareasLocalStorage();
    console.log('Este es el rango'+this.etiquetasTotales.length)
    for (let index = 0; index < this.etiquetasTotales.length; index++) {
      if (etiqueta.nombre === this.etiquetasTotales[index].nombre) {
         encontrada = true;
      }
    }
    if (!encontrada) {
      this.etiquetasTotales.push(etiqueta);
      this.actualizarTareas(this.etiquetasTotales);
    }

  }

  limpiarEtiquetasSeleccionadas() {
    this.etiquetas.splice(0, this.etiquetas.length);
  }

  //Metodo para obtener las etiquetas del localStorage dichas etiquetas son independientes a las que selecciona el usuario
  obtenerTareasLocalStorage() {
    const seCargo = localStorage.getItem("seCargoTareas") || null;
    console.log('el valor de se cargo es: ' + seCargo);
    if (!seCargo || !parseInt(seCargo)) {
      localStorage.setItem("seCargoTareas", '1');
      return this.etiquetasTotales;
    }
    this.etiquetasTotales = JSON.parse(localStorage.getItem("etiquetas") || '[]')
    return this.etiquetasTotales;
  }

  actualizarTareas(etiquetas: Etiqueta[]) {
    localStorage.setItem('etiquetas', JSON.stringify(etiquetas));
  }

  eliminarEtiquetaSeleccionada(etiqueta: Etiqueta) {
    this.etiquetas = this.etiquetas.filter(etiquetaid => etiquetaid !== etiqueta);
  }

  // agregarReceta(Etiqueta: Receta) {
  //   this.estaBuscado
  //   if(!this.estaBuscado) this.recetasBuscador.push(receta);
  //   this.recetasList.push(receta);

  // }
}
