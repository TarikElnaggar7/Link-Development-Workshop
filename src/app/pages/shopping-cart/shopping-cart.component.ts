import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;

  ngOnInit(): void {}

  updateQuantity(courseId: string, quantity: number): void {
    this.cartService.updateQuantity(courseId, quantity);
  }

  removeItem(courseId: string): void {
    this.cartService.removeFromCart(courseId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
