import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductFormComponent } from './product-form.component';
import { ProductsService } from '../../../shared/services/products/products.service';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('(1) TEST - ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFormComponent ],
      imports: [
        MaterialModule,
        HttpClientTestingModule, 
        NoopAnimationsModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
          }
        })],
      providers:[ProductsService,
        TranslateService,
        [
          {provide: MatDialogRef, useValue: {}},
          {provide: MAT_DIALOG_DATA, useValue: []},
      ]]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return invalid form', () =>{
    const form = component.productForm;
    const name = component.nameControl;
    name.setValue('Tornillo');
    expect(form?.invalid).toBeTruthy();
  });

  it('Should return valid form', () =>{
    const form = component.productForm;
    component.nameControl.setValue('Tornillo');
    component.priceControl.setValue(0.1);
    component.formatControl.setValue(component.formats[0]);
    component.markControl.setValue('Lorem');
    expect(form?.valid).toBeTruthy();
  });

});
