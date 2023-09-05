export interface PagingInterface {
  init: number
  limit: number
  num_page: number
  total_items: number
  total_pages: Array<string>
}

export interface ParametersFilters {
  page?: number;
  perPage?: number;
  sort?: string;
  order?: 'ASC' | 'DESC' | string;
  filter?: string;
}

export interface PropsInterface {
  children: JSX.Element
}

export interface ToastInterface {
  show: boolean
  type: 'success' | 'failed'
  description: string
}

export enum UserRoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MERCHANT = 'merchant',
  CUSTOMER = 'customer',
  SHOP = 'shop'
}

export interface Option {
  value: string
  label: string
}

export interface TokenData {
  token: string
  tokenKong: string
}
