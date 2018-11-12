import { Component, OnInit } from '@angular/core';
import { ProductsProviderService } from 'src/app/services/products-provider/products-provider.service';
import { Product } from 'src/app/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  productsToShow: Observable<Product[]>;
  filteredText: string;
  filterBox: BehaviorSubject<string> = <BehaviorSubject<string>>new BehaviorSubject<string>("");
  filterObservable;
  sorting = ['Not Sorted', 'Price', 'Product Name'];
  currentPage: number = 1;

  constructor(private productsService: ProductsProviderService) { }

  ngOnInit() {
    this.getAllProducts();
    this.createAndSubscribeToFilter();
  }

  getAllProducts() {
    this.productsToShow = this.productsService.products;
  }

  startFiltering() {
    if (!this.filteredText || this.filteredText.length < 2) {
      this.productsService.resetFilter();
    } else {
      this.filterBox.next(this.filteredText);
    }
  }

  createAndSubscribeToFilter() {
    this.filterObservable = this.filterBox.asObservable().pipe(
      filter(text => text.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
    );
    this.filterObservable.subscribe(data => {
      this.productsService.applyFilter(data);
    });
  }

  changeSorting(sorting: string) {
    switch (sorting) {
      case "Not Sorted": {
        this.productsService.resetFilter();
        break;
      }
      case "Price": {
        this.productsService.sortByPrice();
        break;
      }
      case "Product Name": {
        this.productsService.sortByName();
      }
    }
  }
}
