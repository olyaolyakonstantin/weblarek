import { IApi, IProductsResponse, IOrder, IOrderResult } from '../types';

export class WebLarekAPI implements IApi {
    constructor(private api: IApi) {}

    // Получение списка товаров
    async getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product');
    }

    // Отправка заказа
    async sendOrder(order: IOrder): Promise<IOrderResult> {
        return this.api.post<IOrderResult>('/order', order);
    }

    // Методы для совместимости с интерфейсом IApi
    get<T extends object>(uri: string): Promise<T> {
        return this.api.get<T>(uri);
    }

    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T> {
        return this.api.post<T>(uri, data, method);
    }
}