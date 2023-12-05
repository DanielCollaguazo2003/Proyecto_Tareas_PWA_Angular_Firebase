import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceComponent } from './pages/indice/indice.component';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';

const routes: Routes = [
  {path: "home", component: IndiceComponent },
  {path: "lista", component: ListaTareasComponent},
  {path: "**", redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
