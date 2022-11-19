import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Observable } from 'rxjs';
import { Product, Category } from '../../interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];
  constructor(private productSvc: ProductsService) { }

  ngOnInit(): void {
    this.#loadData();
  }

  #loadData(){
    this.productSvc.getCategories()?.subscribe(
     resp => {
      if(resp){
        console.log(resp);
        
        this.categories = resp;
      }
     }
    )
  }
}
