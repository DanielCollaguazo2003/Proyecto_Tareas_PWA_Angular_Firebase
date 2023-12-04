import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etiqueta } from 'src/app/domain/etiqueta';
import { Tarea } from 'src/app/domain/tarea';
import { ModalEtiquetaService } from 'src/app/services/modal-etiqueta.service';
import { TareaFirebaseService } from 'src/app/services/tarea-firebase.service';
import { TareaService } from 'src/app/services/tarea.service';

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
  listaEtiquetasActu: Etiqueta[] = [];

  constructor(private router: Router,
    private _tareaFirebaseService: TareaFirebaseService,
     private _modalEtiquetaService: ModalEtiquetaService,
     private _tareaService: TareaService) {
    this.listaEtiquetas = _modalEtiquetaService.getEtiquetas();
  }

  //En el onInit debemos obtener el valor que vamos a observar para el modal al momento de lanzar la pagina
  ngOnInit(): void {
    this._modalEtiquetaService.$modal.subscribe((valor) => { this.modalSwitch = valor });

    this._tareaService.tarea$.subscribe((tarea) => {
      if (tarea) {
        // Si hay una tarea, llenar el formulario
        this.tarea = tarea;
        this.form.patchValue({
          uid: tarea.uid,
          nombre: tarea.nombre,
          fecha: tarea.fecha,
          contenido: tarea.contenido,
          etiquetas: tarea.etiquetas || null, // Asegúrate de manejar correctamente las etiquetas
        });

      }
    });
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
    console.log('Estas son las etiquetas: ' + this.listaEtiquetas[1]);
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
    console.log('hola esta es la etiqueta eliminada' + etiqueta.nombre)
    this._modalEtiquetaService.eliminarEtiquetaSeleccionada(etiqueta);
    this.listaEtiquetas = this._modalEtiquetaService.getEtiquetas();
  }

  actualizarTarea(){
    if (this.tarea) {
      this.tarea = <Tarea>(this.form.getRawValue());
      console.log(this.tarea)
      this._tareaFirebaseService.update(this.tarea);
      this.form.reset();
    }else{
      alert('No existe ninguna tarea para actualizar')
    }
    this.tarea = undefined;
  }


  openModal() {
    this.modalSwitch = true;
  }
}
