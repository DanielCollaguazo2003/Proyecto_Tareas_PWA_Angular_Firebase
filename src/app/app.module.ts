import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { IndiceComponent } from './pages/indice/indice.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environments';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ModelEtiquetasComponent } from './components/model-etiquetas/model-etiquetas.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    ListaTareasComponent,
    PrincipalComponent,
    IndiceComponent,
    ModelEtiquetasComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"proyecto-prueba-final","appId":"1:889212409061:web:cc09dbd2d82103a930700c","storageBucket":"proyecto-prueba-final.appspot.com","apiKey":"AIzaSyCdeD9Z4yYKt-wlUD4WS6e_DT1onNtGbeM","authDomain":"proyecto-prueba-final.firebaseapp.com","messagingSenderId":"889212409061","measurementId":"G-YYK5Z4M56R"})),
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
