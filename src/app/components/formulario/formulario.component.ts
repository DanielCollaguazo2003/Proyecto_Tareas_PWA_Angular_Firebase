import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Etiqueta } from 'src/app/domain/etiqueta';
import { Tarea } from 'src/app/domain/tarea';
import { ModalEtiquetaService } from 'src/app/services/modal-etiqueta.service';
import { TareaFirebaseService } from 'src/app/services/tarea-firebase.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  tarea?: Tarea;
  @Input() etiquetas?: string[];
  modalSwitch: boolean = false;
  listaEtiquetas: Etiqueta[] = [];

  constructor(private _tareaFirebaseService: TareaFirebaseService, private _modalEtiquetaService: ModalEtiquetaService) {
    this.listaEtiquetas = _modalEtiquetaService.getEtiquetas();
  }

  //En el onInit debemos obtener el valor que vamos a observar para el modal al momento de lanzar la pagina
  ngOnInit(): void {
    this._modalEtiquetaService.$modal.subscribe((valor) => { this.modalSwitch = valor })
  }

  form = new FormGroup({
    uid: new FormControl(this._tareaFirebaseService.generateUid(), []),
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl<Date | null>(null, [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
    etiquetas: new FormControl(this._modalEtiquetaService.getEtiquetas(), []),
  })

  agregartarea() {
    console.log(<Tarea>(this.form.getRawValue()));
    if (this.form.invalid) {
      alert('La informacion ingresada es incorrecta o incompleta');
      return
    }

    const tarea: Tarea = <Tarea>(this.form.getRawValue());

    this._tareaFirebaseService.save(tarea);

    this.form.reset();

    this._modalEtiquetaService.limpiarEtiquetasSeleccionadas();


  }

  eliminarEtiqueta(etiqueta: Etiqueta){
    console.log('hola')
    this._modalEtiquetaService.eliminarEtiquetaSeleccionada(etiqueta);
    this.listaEtiquetas = this._modalEtiquetaService.getEtiquetas();
  }

  actualizarTarea(){

  }
  openModal() {
    this.modalSwitch = true;
  }
}
