import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule
  ]
})
export class HomeModule { }
