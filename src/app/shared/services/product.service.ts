import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };


  constructor( private http: HttpClient) { }

  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products);
  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  }

  create(products: IProductRequest): Observable<void> {
    return this.http.post<void>(this.api.products, products);
  }

  update(products: IProductResponse, id: number): Observable<void> {
    return this.http.patch<void>(`${this.api.products}/${id}`, products);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }


}
