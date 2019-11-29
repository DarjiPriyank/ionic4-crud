import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'employee-detail/:id',
    loadChildren: () => import('./employee-detail/employee-detail.module').then( m => m.EmployeeDetailPageModule)
  },
  {
    path: 'employee-add',
    loadChildren: () => import('./employee-add/employee-add.module').then( m => m.EmployeeAddPageModule)
  },
  {
    path: 'employee-edit/:id',
    loadChildren: () => import('./employee-edit/employee-edit.module').then( m => m.EmployeeEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
