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

  getCategories(numberPage: number = 0, limit: number = 5): Observable<Category[]> | undefined {
    const params: HttpParams = new HttpParams();
    params.append('_page', numberPage);
    params.append('limit', limit);
    return this.http.get<Category[]>(`${this.baseUrl}/category`, {params});
  }

  getProducts(id:number, numberPage: number = 0, limit: number = 5): Observable<Category> | undefined {
    const params: HttpParams = new HttpParams();
    params.append('_page', numberPage);
    params.append('limit', limit);
    return this.http.get<Category>(`${this.baseUrl}/category/${id}`, {params});
  }

}
