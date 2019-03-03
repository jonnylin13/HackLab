import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CreateLabComponent } from './pages/create-lab/create-lab.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { JoinLabComponent } from './pages/join-lab/join-lab.component';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-lab', component: CreateLabComponent },
  { path: 'join-lab', component: JoinLabComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'student', component: StudentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
