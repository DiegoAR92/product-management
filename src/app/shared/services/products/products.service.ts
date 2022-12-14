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

  getProductsByCategory(idCategory?:string, numberPage?: number, limit?: number, sort?: string, direction?: string): Observable<Product[]> | undefined {
    let params: HttpParams = new HttpParams();

    if(idCategory){
      params = params.append('category_id', idCategory);
    }
    
    if(numberPage){
      params = params.append('_page', numberPage+1);
    }
    if(limit){
      params = params.append('_limit', limit);
    }

    if(sort && direction){
      params = params.append('_sort',sort).append('_order',direction);
    }

    return this.http.get<Product[]>(`${this.baseUrl}/products`, {params});
  }

  getProductById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  createProduct(product: Product){
    return this.http.post(`${this.baseUrl}/products`, {product});
  }

  updateProduct(id:string,product: Product){
    return this.http.put(`${this.baseUrl}/products/${id}`, {product});
  }

  deleteProduct(idProduct: string) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/products/${idProduct}`);
  }

}
