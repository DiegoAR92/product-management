import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../shared/services/products/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iif, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, AfterViewInit {
  formats: string[] = ['white', "black", "green", "yellow", "grey"]

  id?: string;
  productForm?: FormGroup;

  private _subscription = new Subscription();

  constructor(
    private productSrv: ProductsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: {id?:string} 
  ) { }
  

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    if(this.data){
      this.id = this.data.id;
      this.getProduct();
    }
  }

  initForm(){
    this.productForm = this.formBuilder.group({
      name: this.formBuilder.control('', [
        Validators.required
      ]),
      price: this.formBuilder.control('0', [
        Validators.required
      ]),
      format: this.formBuilder.control('', [
        Validators.required
      ]),
      mark: this.formBuilder.control('', [
        Validators.required
      ])
    });
  }

  getProduct(){
    this.productSrv.getProductById(this.id!).subscribe(resp => {
      this.productForm?.patchValue(resp);
    });
  }

  save(){
    const productValue = this.productForm?.value;
    this._subscription.add(
      iif(
        () => !!this.id,
        this.productSrv.updateProduct(this.id!,productValue),
        this.productSrv.createProduct(productValue)
      ).subscribe({
        next: (product) => {
          console.log(product);
          this.dialogRef.close()
        },
        error: (err) => {
          console.error(err);
        }}
      )
    )
  }

  priceChange(increment: number){
    if(this.priceControl.value == 0 && increment < 0) return;
    this.productForm?.get('price')?.setValue((Number(this.priceControl.value) + increment).toFixed(2));
  }

  get nameControl(): FormControl {
    return this.productForm?.get('name') as FormControl;
  }

  get priceControl(): FormControl {
    return this.productForm?.get('price') as FormControl;
  }

  get formatControl(): FormControl {
    return this.productForm?.get('format') as FormControl;
  }

  get markControl(): FormControl {
    return this.productForm?.get('mark') as FormControl;
  }

}
