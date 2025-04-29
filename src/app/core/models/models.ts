export interface Banner {
  id: number;
  title: string;
  brief: string;
  image: string;
  order: number;
  category: string;
  colorCode: string;
}

export interface GalleryItem {
  id: number;
  imageUrl: string;
  caption?: string;
}

export interface Course {
  id: string; // Changed from number to string to match API
  title: string;
  description: string;
  author: string;
  price: number;
  discount?: number; // Changed from discountedPrice to match API
  image: string; // Changed from imageUrl to match API
  category: string;
  categoryID: number;
  level: string;
  hours: number; // Changed from totalHours to match API
  lectures: number;
  ratingCount?: number; // Added to match API
  showOnHomepage?: boolean; // Added to match API
  addToCart?: boolean; // Added to match API
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem {
  course: Course;
  quantity: number;
}

export interface CheckoutForm {
  country: string;
  state: string;
  paymentMethod: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}
