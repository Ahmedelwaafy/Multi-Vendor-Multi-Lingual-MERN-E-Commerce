export type UserType = {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  phone: number | string;
  password: number | string;
  confirmPassword: number | string;
  platform: string;
  addresses: {
    country: string;
    city: string;
    address1: string;
    address2: string;
    zipCode: number;
    addressType: string;
  }[];
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;
  role: string;
  createdAt: Date;
  comparePassword: (value: string) => Promise<boolean>;
  changedPasswordAfterLogin: (value: string | number) => Promise<boolean>;
  createPasswordResetToken: () => string;
};

export interface VendorType {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  description?: string;
  address: string;
  phone: number;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active?: boolean;
  role?: string;
  platform?: "mobile" | "website";
  avatar?: {
    public_id: string;
    url: string;
  };
  zipCode: number;
  views: number;
  withdrawMethod?: object;
  availableBalance?: number;
  transactions?: Transaction[];
  createdAt?: Date;
  comparePassword: (value: string) => Promise<boolean>;
  changedPasswordAfterLogin: (value: string | number) => Promise<boolean>;
  createPasswordResetToken: () => string;
}

interface Transaction {
  amount: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { Request } from "express";
export interface CustomRequest extends Request {
  user?: UserType;
  vendor?: VendorType;
  avatar?: {
    filename: string;
    originalname: string;
    encoding: string;
    mimetype: string;
  };
}

interface Order {
  cart: CartItem[];
  shippingAddress: ShippingAddress;
  user: User;
  totalPrice: number;
  status: string;
  paymentInfo: PaymentInfo;
  paidAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface User {
  userId: string;
  username: string;
  email: string;
}

interface PaymentInfo {
  id?: string;
  status?: string;
  type?: string;
}
