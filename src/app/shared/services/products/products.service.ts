import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, from, Observable, of } from 'rxjs';
import { Product, Category } from '../../../interfaces/product.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> | undefined {
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }

  getProductsByCategory(idCategory?:string, numberPage?: number, limit?: number): Observable<Product[]> | undefined {
    let params: HttpParams = new HttpParams();
    if(idCategory){
      params = params.append('category_id', idCategory);
    }
    
    if(numberPage){
      params = params.append('_page', numberPage);
    }
    if(limit){
      params = params.append('_limit', limit);
    }

    return this.http.get<Product[]>(`${this.baseUrl}/products`, {params});
  }

  createProduct(product: Product){
    return this.http.post(`${this.baseUrl}/products`, {product});
  }

  deleteProduct(idProduct: string) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/products/${idProduct}`);
  }

}
