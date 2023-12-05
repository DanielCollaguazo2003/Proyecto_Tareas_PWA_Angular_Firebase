import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etiqueta } from 'src/app/domain/etiqueta';
import { Tarea } from 'src/app/domain/tarea';
import { ModalEtiquetaService } from 'src/app/services/modal-etiqueta.service';
import { TareaFirebaseService } from 'src/app/services/tarea-firebase.service';
import { TareaService } from 'src/app/services/tarea.service';
import { ListaTareasComponent } from '../lista-tareas/lista-tareas.component';

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
  listaTareas: Tarea[] = [];

  constructor(
    private router: Router,
    private _tareaFirebaseService: TareaFirebaseService,
    private _modalEtiquetaService: ModalEtiquetaService,
    private route: ActivatedRoute,
    private _tareaService: TareaService
  ) {
    this.listaEtiquetas = _modalEtiquetaService.getEtiquetas();
  }

  ngOnInit(): void {
    this._modalEtiquetaService.$modal.subscribe((valor) => { this.modalSwitch = valor });
    this.route.params.subscribe(params => {
      const tareaId = params['id'];

      this._tareaFirebaseService.getTarea(tareaId).subscribe((tarea: any) => {
        if (tarea.exists) {
          const tareaData = tarea.data();

          if (tareaData.etiquetas) {
            for (let index = 0; index < tareaData.etiquetas.length; index++) {
              this._modalEtiquetaService.addEtiqueta(tareaData.etiquetas[index]);
            }
          } else {
            this.listaEtiquetas = [];
            this._modalEtiquetaService.setEtiquetas(this.listaEtiquetas);
          }

          this.tarea = tareaData;
          this.form.patchValue({
            uid: tareaData.uid,
            nombre: tareaData.nombre,
            fecha: tareaData.fecha,
            contenido: tareaData.contenido,
            etiquetas: tareaData.etiquetas || null,
          });
        } else {
          console.error('La tarea no existe.');
          // Puedes manejar el caso cuando la tarea no existe, por ejemplo, redirigiendo o mostrando un mensaje.
        }
      });
    });
  }
  //En el onInit debemos obtener el valor que vamos a observar para el modal al momento de lanzar la pagina

  form = new FormGroup({
    uid: new FormControl(this._tareaFirebaseService.generateUid(), []),
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl<Date | null>(null, [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
    etiquetas: new FormControl(this._modalEtiquetaService.getEtiquetas(), []),
  })

  agregartarea() {
    if (!this.tarea) {
      console.log(<Tarea>(this.form.getRawValue()));
      console.log('Estas son las etiquetas: ' + this.listaEtiquetas[1]);
      if (this.form.invalid) {
        alert('La informacion ingresada es incorrecta o incompleta');
        return
      }
      this.listaEtiquetas = this._modalEtiquetaService.getEtiquetas();
      const tarea: Tarea = <Tarea>(this.form.getRawValue());
      tarea.etiquetas = this.listaEtiquetas;
      this._tareaFirebaseService.save(tarea);

      this.form.reset();

      this._modalEtiquetaService.limpiarEtiquetasSeleccionadas();
    }else{
      alert('Esta en la actualizando una tarea')
    }
  }

  eliminarEtiqueta(etiqueta: Etiqueta) {
    console.log('hola esta es la etiqueta eliminada' + etiqueta.nombre)
    this._modalEtiquetaService.eliminarEtiquetaSeleccionada(etiqueta);
    this.listaEtiquetas = this._modalEtiquetaService.getEtiquetas();
  }

  actualizarTarea() {
    if (this.tarea) {
      this.tarea = <Tarea>(this.form.getRawValue());
      this.tarea.etiquetas = this._modalEtiquetaService.getEtiquetas();
      console.log('Esta son las etiquetas a actualizar: ' + this.tarea.etiquetas?.toString());
      this._tareaFirebaseService.update(this.tarea);
      this.listaEtiquetas = [];
      this._modalEtiquetaService.setEtiquetas(this.listaEtiquetas);
      this.form.reset();
      this.router.navigate(['/home']);
    } else {
      alert('No existe ninguna tarea para actualizar')
    }
    this.tarea = undefined;
  }


  openModal() {
    this.modalSwitch = true;
  }

  scrollToList() {
    this._tareaService.triggerScroll();
    console.log('hola')
  }
}
