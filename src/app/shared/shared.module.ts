import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
