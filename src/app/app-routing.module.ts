import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceComponent } from './pages/indice/indice.component';

const routes: Routes = [
  {path: "home", component: IndiceComponent },
  {path: "**", redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
