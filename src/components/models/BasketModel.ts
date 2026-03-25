import { IProduct } from '../../types';

export class BasketModel {
    private items: IProduct[] = [];

    // Возвращает массив товаров в корзине
    getItems(): IProduct[] {
        return this.items;
    }

    // Добавляет товар в корзину
    addItem(product: IProduct): void {
        if (!this.hasItem(product.id)) {
            this.items.push(product);
        }
    }

    // Удаляет товар из корзины по id
    removeItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    // Очищает корзину
    clear(): void {
        this.items = [];
    }

    // Возвращает общую стоимость товаров в корзине
    getTotal(): number {
        return this.items.reduce((total, item) => {
            return total + (item.price ?? 0);
        }, 0);
    }

    // Возвращает количество товаров в корзине
    getCount(): number {
        return this.items.length;
    }

    // Проверяет наличие товара в корзине по id
    hasItem(id: string): boolean {
        return this.items.some(item => item.id === id);
    }
}