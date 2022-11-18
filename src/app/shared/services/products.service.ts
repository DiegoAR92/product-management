import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from '../../interfaces/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = environment.baseUrl;

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
