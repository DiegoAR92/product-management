import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Observable, map } from 'rxjs';
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
          this.categories = resp;
          this.categories.map(c=> {
            this.productSvc.getProductsByCategory(c.id.toString())?.subscribe(
              product => {
                c.amount = product.length;
              }
            )
          })
        }
    );
  }
}
