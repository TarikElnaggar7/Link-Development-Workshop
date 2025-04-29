import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);

  checkoutForm!: FormGroup;
  cartTotal = this.cartService.cartTotal;
  subtotal = this.cartService.cartTotal;
  tax = computed(() => this.subtotal() * 0.1);
  total = computed(() => this.subtotal() + this.tax());

  countries = ['Egypt', 'USA', 'UAE', 'KSA', 'Qatar'];
  states: { [country: string]: string[] } = {
    Egypt: ['Cairo', 'Alexandria', 'Giza'],
    USA: ['California', 'New York', 'Texas'],
    UAE: ['Dubai', 'Abu Dhabi', 'Sharjah'],
    KSA: ['Riyadh', 'Jeddah', 'Dammam'],
    Qatar: ['Doha', 'Al Rayyan'],
  };
  currentStates: string[] = [];

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      paymentMethod: ['creditCard', Validators.required], // Default or based on selection
      cardName: ['', Validators.required],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ], // Basic 16-digit pattern
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{2})$'),
        ],
      ], // MM/YY pattern
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]], // 3 or 4 digit CVC
    });

    this.checkoutForm.get('country')?.valueChanges.subscribe((country) => {
      this.currentStates = this.states[country] || [];
      this.checkoutForm.get('state')?.reset('');
    });

    const initialCountry = this.checkoutForm.get('country')?.value;
    if (initialCountry) {
      this.currentStates = this.states[initialCountry] || [];
    }
  }

  onSubmit(): void {
    this.router.navigate(['/complete']);

    if (this.checkoutForm.valid) {
      console.log('Form Submitted:', this.checkoutForm.value);
      alert('Order submitted successfully (check console for data)!');
      this.cartService.clearCart();

      setTimeout(() => {
        this.router.navigate(['/complete']);
      }, 2000);
    } else {
      console.log('Form is invalid');
      this.checkoutForm.markAllAsTouched();
    }
  }
}
