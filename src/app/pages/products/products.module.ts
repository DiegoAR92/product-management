import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ListProductsComponent } from './list-products/list-products.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent
  }
]

@NgModule({
  declarations: [
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
