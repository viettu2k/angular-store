import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'shoes',
        price: 145,
        quantity: 34,
        id: 1,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuanity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuanity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout() {
    this.http
      .post('http://localhost:4242/', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51Ira4aJlFs0TYKlg0LvnitewXm8rpy8sqzfkPLmB9lPjakNzbg4zlReXUCVQKIdBpHrGs9tr43gGyohFWk9Qs0h700ADQTdDHs'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
