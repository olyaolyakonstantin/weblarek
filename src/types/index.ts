// Существующие типы
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Тип способа оплаты
export type TPayment = 'card' | 'cash';

// Товар
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// Данные покупателя
export interface IBuyer {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

// Ответ сервера при получении товаров
export interface IProductsResponse {
    items: IProduct[];
    total: number;
}

// Заказ для отправки на сервер
export interface IOrder {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
    items: string[];
    total: number;
}

// Ответ сервера после успешного заказа
export interface IOrderResult {
    id: string;
    total: number;
}