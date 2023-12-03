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

  //Agregar una receta
  addEtiqueta(etiqueta: Etiqueta) {
    let encontrada: boolean = false;
    this.etiquetas.push(etiqueta);
    for (let index = 0; index < this.etiquetasTotales.length; index++) {
      if (etiqueta === this.etiquetasTotales[index]) {
         encontrada = true;
      }
    }
    if (!encontrada) {
      this.etiquetasTotales.push(etiqueta);
      this.actualizarRecetas(this.etiquetasTotales);
    }

  }

  limpiarEtiquetasSeleccionadas() {
    this.etiquetas.splice(0, this.etiquetas.length);
  }

  //Metodo para obtener las etiquetas del localStorage dichas etiquetas son independientes a las que selecciona el usuario
  obtenerRecetasLocalStorage() {
    const seCargo = localStorage.getItem("seCargoRecetas") || null;
    if (!seCargo || !parseInt(seCargo)) {
      localStorage.setItem("seCargoRecetas", '1');
      return this.etiquetasTotales;
    }
    this.etiquetasTotales = JSON.parse(localStorage.getItem("etiquetas") || '[]')
    return this.etiquetasTotales;
  }

  actualizarRecetas(etiquetas: Etiqueta[]) {
    localStorage.setItem('etiquetas', JSON.stringify(etiquetas));
    this.etiquetasTotales = etiquetas;
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
