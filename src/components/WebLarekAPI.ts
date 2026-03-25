import { Api } from './base/Api';
import { IApi, IProduct, IProductsResponse, IOrder, IOrderResult } from '../types';

export class WebLarekAPI extends Api implements IApi {
    constructor(baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
    }

    // Получение списка товаров
    async getProducts(): Promise<IProductsResponse> {
        return this.get<IProductsResponse>('/product');
    }

    // Отправка заказа
    async sendOrder(order: IOrder): Promise<IOrderResult> {
        return this.post<IOrderResult>('/order', order);
    }
}