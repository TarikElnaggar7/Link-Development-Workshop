import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'course/:id',
    loadComponent: () =>
      import('./pages/course-details/course-details.component').then(
        (m) => m.CourseDetailsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/shopping-cart/shopping-cart.component').then(
        (m) => m.ShoppingCartComponent
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
  },
  {
    path: 'complete',
    loadComponent: () =>
      import('./pages/complete/complete.component').then(
        (m) => m.CompleteComponent
      ),
  },
  // Add a wildcard route for 404 Not Found, potentially redirecting to home or a dedicated 404 component later
  { path: '**', redirectTo: '' },
];
