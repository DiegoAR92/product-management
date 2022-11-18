import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeModule } from './home/home.module';
import { MaterialModule } from '../shared/material/material.module';
import { Routes } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    HomeModule
  ]
})
export class PagesModule { }
