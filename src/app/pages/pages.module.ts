import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeModule } from './home/home.module';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../shared/utils/user.guard';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    HomeModule,
    RouterModule.forRoot(routes),
    ProductsModule
  ]
})
export class PagesModule { }
