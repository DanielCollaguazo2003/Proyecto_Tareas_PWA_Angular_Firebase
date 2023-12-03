import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalEtiquetaService } from 'src/app/services/modal-etiqueta.service';
import { Etiqueta } from '../../domain/etiqueta';

@Component({
  selector: 'app-model-etiquetas',
  templateUrl: './model-etiquetas.component.html',
  styleUrls: ['./model-etiquetas.component.css']
})
export class ModelEtiquetasComponent {
  modalSwitch?: boolean;

  listaEtiquetas: Etiqueta[];

  constructor(private _modalEtiquetaService: ModalEtiquetaService){
    this.listaEtiquetas = _modalEtiquetaService.obtenerRecetasLocalStorage();
  }
  cerrarModal(){
    this._modalEtiquetaService.$modal.emit(false);
  }

  form = new FormGroup({
    id: new FormControl(this._modalEtiquetaService.obtenerRecetasLocalStorage().length, []),
    nombre: new FormControl('', [Validators.required]),
  })

  agregarEtiqueta(){
    if (this.form.invalid) {
      alert('La informacion ingresada es incorrecta o incompleta');
      return
    }

    const etiqueta: Etiqueta = <Etiqueta>(this.form.getRawValue());
    this._modalEtiquetaService.addEtiqueta(etiqueta);

    this.form.reset();
  }

  seleccionarEtiqueta(etiqueta: Etiqueta){

    this._modalEtiquetaService.addEtiqueta(etiqueta);

  }

}
