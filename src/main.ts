import './scss/styles.scss';

// Импорт моделей
import { CatalogModel } from './components/models/CatalogModel';
import { BasketModel } from './components/models/BasketModel';
import { BuyerModel } from './components/models/BuyerModel';

// Импорт API
import { WebLarekAPI } from './components/WebLarekAPI';
import { API_URL } from './utils/constants';

// ===== Инициализация моделей =====
const catalogModel = new CatalogModel();
const basketModel = new BasketModel();
const buyerModel = new BuyerModel();

// ===== Инициализация API =====
const api = new WebLarekAPI(API_URL);

// ===== Тестирование работы с сервером =====
console.log('=== Загрузка товаров с сервера ===');

api.getProducts()
    .then(({ items, total }) => {
        console.log('Получено товаров:', total);
        console.log('Товары:', items);
        
        // Сохраняем в модель каталога
        catalogModel.setItems(items);
        
        // Проверяем, что сохранилось
        console.log('=== Товары в модели каталога ===');
        console.log(catalogModel.getItems());
        
        // Проверяем получение товара по id
        if (items.length > 0) {
            const firstProduct = items[0];
            console.log('=== Поиск товара по id ===');
            console.log('Найденный товар:', catalogModel.getProductById(firstProduct.id));
        }
    })
    .catch(error => {
        console.error('Ошибка при загрузке товаров:', error);
    });

// ===== Тестирование отправки заказа (пример) =====
// Раскомментировать для проверки отправки заказа
/*
const testOrder: IOrder = {
    payment: 'card',
    address: 'ул. Тестовая, д. 1',
    email: 'test@example.com',
    phone: '+7 999 123-45-67',
    items: ['854cef69-976d-4c2a-a18c-2aa45046c390'],
    total: 750
};

api.sendOrder(testOrder)
    .then(result => {
        console.log('Заказ оформлен:', result);
    })
    .catch(error => {
        console.error('Ошибка при оформлении заказа:', error);
    });
*/