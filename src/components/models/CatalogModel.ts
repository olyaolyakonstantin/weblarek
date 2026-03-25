import { IProduct } from '../../types';

export class CatalogModel {
    private items: IProduct[] = [];
    private selectedProduct: IProduct | null = null;

    // Сохраняет массив товаров
    setItems(products: IProduct[]): void {
        this.items = products;
    }

    // Возвращает массив всех товаров
    getItems(): IProduct[] {
        return this.items;
    }

    // Возвращает товар по id
    getProductById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    // Сохраняет товар для подробного отображения
    setSelectedProduct(product: IProduct | null): void {
        this.selectedProduct = product;
    }

    // Возвращает выбранный товар
    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}