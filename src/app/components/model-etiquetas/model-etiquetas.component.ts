import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalEtiquetaService } from 'src/app/services/modal-etiqueta.service';
import { Etiqueta } from '../../domain/etiqueta';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-model-etiquetas',
  templateUrl: './model-etiquetas.component.html',
  styleUrls: ['./model-etiquetas.component.css']
})
export class ModelEtiquetasComponent {
  modalSwitch?: boolean;

  listaEtiquetas: Etiqueta[];
  listaEtiquetasActualizar?: Etiqueta[];

  constructor(private _modalEtiquetaService: ModalEtiquetaService, private _tareaService: TareaService) {
    this.listaEtiquetas = _modalEtiquetaService.obtenerTareasLocalStorage();
  }
  // ngOnInit(): void {
  //   this._tareaService.tarea$.subscribe((tarea) => {
  //     if (tarea) {
  //       if (tarea.etiquetas) {
  //         this.listaEtiquetasActualizar = tarea.etiquetas;
  //       }
  //     }
  //   });
  //}

  cerrarModal() {
    this._modalEtiquetaService.$modal.emit(false);
  }

  form = new FormGroup({
    id: new FormControl(this._modalEtiquetaService.obtenerTareasLocalStorage().length, []),
    nombre: new FormControl('', [Validators.required]),
  })

  agregarEtiqueta() {
    if (this.form.invalid) {
      alert('La informacion ingresada es incorrecta o incompleta');
      return
    }

    const etiqueta: Etiqueta = <Etiqueta>(this.form.getRawValue());

    // if (this.listaEtiquetasActualizar) {
    //   for (let index = 0; index < this.listaEtiquetasActualizar.length; index++) {
    //     this._modalEtiquetaService.addEtiqueta(this.listaEtiquetasActualizar[index]);

    //   }
    //   this.listaEtiquetasActualizar = undefined;
    // }else {
    this._modalEtiquetaService.addEtiqueta(etiqueta);
    //}
    this.listaEtiquetas = this._modalEtiquetaService.obtenerTareasLocalStorage();
    this.form.reset();
    //}
  }

  seleccionarEtiqueta(etiqueta: Etiqueta) {

    // if (this.listaEtiquetasActualizar) {
    //   for (let index = 0; index < this.listaEtiquetasActualizar.length; index++) {
    //     this._modalEtiquetaService.addEtiqueta(this.listaEtiquetasActualizar[index]);
    //   }
    //   this.listaEtiquetasActualizar = undefined;
    // }else {
    this._modalEtiquetaService.addEtiqueta(etiqueta);
    //}

  }

}
