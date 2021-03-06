import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateLabComponent } from './pages/create-lab/create-lab.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LogoComponent } from './components/logo/logo.component';
import { AboutComponent } from './pages/about/about.component';
import { ModalComponent } from './components/modal/modal.component';
import { AdminComponent } from './pages/admin/admin.component';
import { JoinLabComponent } from './pages/join-lab/join-lab.component';
import { StudentComponent } from './pages/student/student.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    HomeComponent,
    CreateLabComponent,
    NavbarComponent,
    LayoutComponent,
    LogoComponent,
    AboutComponent,
    ModalComponent,
    AdminComponent,
    JoinLabComponent,
    StudentComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
