import { IVendorType } from ".";

interface User {
  img: string;
  name: string;
  email: string;
}

export interface Image {
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
  stock: number;
  views: number;
  images: Image[];
  reviews: IReviewType[];
  vendor: IVendorType | string;
  isFav: boolean;
  createdAt: string;
  originalPrice: number;
  finalPrice: number;
  sold_out: number;
  ratings?: number;
  tags?: string;
}

export interface IEventType extends IProductType {
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface IDiscountCodeType {
  _id: string;
  name: string;
  value: number;
  maxUsage: number;
  usageCount: number;
  vendor: string;
  ProductID: string;
  minPrice?: number;
  maxPrice?: number;
  createdAt: string;
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
export interface ICategoryType {
  _id: 1;
  name: string;
  img: Image;
}
