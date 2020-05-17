import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { flatMap, first, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "/api/product/getproducts";

  private productUrl: string = "/api/product/addproduct";

  private deleteUrl: string = "/api/product/deleteproduct/";

  private updateUrl: string = "/api/product/updateproduct/";
}
