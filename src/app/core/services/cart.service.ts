import { Injectable, signal } from '@angular/core';
import { Course, CartItem } from '../models/models';
import { computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>(this.loadCartFromLocalStorage());

  cartItems = this.cartItemsSignal.asReadonly();
  cartTotal = computed(() =>
    this.cartItems().reduce((total, item) => {
      const price = item.course.discount
        ? item.course.price * (1 - item.course.discount / 100)
        : item.course.price;
      return total + price * item.quantity;
    }, 0)
  );
  itemCount = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  constructor() {}

  private saveCartToLocalStorage(items: CartItem[]): void {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to local storage', e);
    }
  }

  private loadCartFromLocalStorage(): CartItem[] {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Error loading cart from local storage', e);
      return [];
    }
  }

  addToCart(course: Course): void {
    this.cartItemsSignal.update((items) => {
      const existingItem = items.find((item) => item.course.id === course.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = items.map((item) =>
          item.course.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...items, { course, quantity: 1 }];
      }
      this.saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  }

  updateQuantity(courseId: string, quantity: number): void {
    this.cartItemsSignal.update((items) => {
      let updatedItems;
      if (quantity <= 0) {
        updatedItems = items.filter((item) => item.course.id !== courseId);
      } else {
        updatedItems = items.map((item) =>
          item.course.id === courseId ? { ...item, quantity } : item
        );
      }
      this.saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  }

  removeFromCart(courseId: string): void {
    this.cartItemsSignal.update((items) => {
      const updatedItems = items.filter((item) => item.course.id !== courseId);
      this.saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
    this.saveCartToLocalStorage([]);
  }
}
