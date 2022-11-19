import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserGuard } from './shared/utils/user.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'list-products/:id',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
    canActivate: [UserGuard],
    canLoad: [UserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
