export interface Product {
  id: number;
  colour: string;
  name: string;
  img: string;
  price: number;
  quantity: number;
}

export interface Menu {
  id: number;
  name: string;
  img: string;
}

export interface ProductState {
  products: [Product];
  menu: [Menu];
  error: string;
}

export interface CartState {
  cart: [Product];
}
