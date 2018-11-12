import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models';
import { NetService } from '../net.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsProviderService {

  private _products: BehaviorSubject<Product[]> = <BehaviorSubject<Product[]>>new BehaviorSubject<Product[]>([]);
  private _selectedProduct: BehaviorSubject<Product> = <BehaviorSubject<Product>>new BehaviorSubject<Product>(<any>{});
  private productStorage: { products: Product[] } = { products: [] };
  private untouchedData: { products: Product[] } = { products: [] };

  constructor(private netService: NetService, private toastr: ToastrService) {
    this.loadAllProducts();
  }

  get products() {
    return this._products.asObservable();
  }

  get selectedProduct() {
    return this._selectedProduct.asObservable();
  }

  loadAllProducts() {
    this.netService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.productStorage.products = data;
        this.untouchedData.products = this.clone(data);
        this._products.next({ ...this.productStorage }.products);
      }, err => {
        this.toastr.error(err);
      });
  }

  changeSelectedProduct(product: Product) {
    this._selectedProduct.next(product);
  }

  applyFilter(filter: string) {
    let filteredStorage;
    filteredStorage = { ...this.productStorage }.products.filter(product => product.name.includes(filter) || product.description.includes(filter));
    this._products.next(filteredStorage);
  }

  resetFilter() {
    this._products.next({ ...this.untouchedData }.products);
  }

  sortByPrice() {
    let sortedByPrice;
    sortedByPrice = { ...this.productStorage }.products.sort(function (a, b) {
      return a.price - b.price;
    })
    this._products.next(sortedByPrice);
  }

  sortByName() {
    let sortedByName;
    sortedByName = { ...this.productStorage }.products.sort(function (a, b) {
      let p1name = a.name;
      let p2name = b.name;
      if (p1name < p2name) {
        return -1;
      }
      if (p1name > p2name) {
        return 1;
      }
      return 0;
    })
    this._products.next(sortedByName);
  }

  clone(data: Product[]): Product[] {
    let clonedArray: Product[] = [];
    data.forEach(product => {
      let clone = { ...product };
      clonedArray.push(clone);
    });
    return clonedArray;
  }

}
