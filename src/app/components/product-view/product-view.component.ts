import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductsProviderService } from 'src/app/services/products-provider/products-provider.service';
import { ToastrService, ToastRef } from 'ngx-toastr';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  @Input() product: Product;

  constructor(private productsService: ProductsProviderService, private toaster: ToastrService) { }

  ngOnInit() {
  }

  productClicked() {
    this.productsService.changeSelectedProduct(this.product);
  }

  delete() {
    this.toaster.warning(`${this.product.name} has been deleted! Not really!`);
  }
}
