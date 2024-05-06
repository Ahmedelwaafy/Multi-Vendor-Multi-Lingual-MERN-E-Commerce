interface User {
  img: string;
  name: string;
  email: string;
}

interface Image {
  public_id: string;
  url: string;
}

export interface IReviewType {
  id: string;
  user: User;
  rating: number;
  comment: string;
  productId: string;
  createdAt: string;
}

interface Shop {
  name: string;
  location: string;
}

export interface IProductType {
  _id: number;
  name: string;
  description: string;
  category: string;
  discount_Price: number;
  stock: number;
  views: number;
  images: Image[];
  reviews: IReviewType[];
  shop_id: string;
  shop: Shop;
  is_fav: boolean;
  createdAt: string;
  originalPrice: number;
  finalPrice: number;
  ratings?: number;
  sold_out?: number;
  tags?: string;
}
export interface IEventType {
  id: number;
  name: string;
  description: string;
  category: string;
  start_Date: Date;
  finish_Date: Date;
  discount_Price: number;
  stock: number;
  views: number;
  images: Image[];
  shopId: string;
  createdAt: string;
  shop: Shop;
  status?: string;
  tags?: string;
  original_price?: number;
  sold_out?: number; // Sold_out is optional with default value 0
}

export interface IPaymentMethodType {
  id: 1;
  name: string;
  card_type: "visa" | "master_card" | "pay_on_delivery";
  last_digits: number;
  default: boolean;
  expiry_date: string;
}
export interface IAddressType {
  id: 1;
  address: string;
  phone: number;
  default: boolean;
}
