import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductsProviderService } from 'src/app/services/products-provider/products-provider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  selectedProduct: Product;
  formIsValid: boolean = true;

  constructor(private productsService: ProductsProviderService, private toaster: ToastrService) { }

  ngOnInit() {
    this.subscribeToSelectedProduct();
  }

  subscribeToSelectedProduct() {
    this.productsService.selectedProduct.subscribe(product => {
      this.selectedProduct = product;
    })
  }

  saveProduct() {
    this.toaster.success(`Thank you for updating product ${this.selectedProduct.name}`)
  }

  checkPriceValid() {
    if (this.selectedProduct.price < 0 || (!this.selectedProduct.price)) {
      this.formIsValid = false;
    } else {
      this.formIsValid = true;
    }
  }
}
