import { Etiqueta } from "./etiqueta";

export interface Tarea  {
  uid: string;
  nombre: string;
  fecha: Date;
  contenido: string;
  etiquetas: Etiqueta[] | null;
}
