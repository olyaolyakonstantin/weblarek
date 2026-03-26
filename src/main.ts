import './scss/styles.scss';

// Импорт моковых данных для тестирования
import { apiProducts } from './utils/data';

// Импорт моделей
import { CatalogModel } from './components/models/CatalogModel';
import { BasketModel } from './components/models/BasketModel';
import { BuyerModel } from './components/models/BuyerModel';

import { Api } from './components/base/Api';
import { WebLarekAPI } from './components/WebLarekAPI';
import { API_URL } from './utils/constants';

console.log('========== ТЕСТИРОВАНИЕ МОДЕЛЕЙ ДАННЫХ ==========');

// ===== 1. ТЕСТИРОВАНИЕ CatalogModel =====
console.log('\n=== 1. CatalogModel ===');

const catalogModel = new CatalogModel();

// setItems — сохраняем массив товаров
catalogModel.setItems(apiProducts.items);
console.log('1.1 setItems() + getItems():');
console.log('   Количество товаров:', catalogModel.getItems().length);
console.log('   Первый товар:', catalogModel.getItems()[0]?.title);
console.log('   Второй товар:', catalogModel.getItems()[1]?.title);

// getProductById — получение товара по id
const testId = apiProducts.items[0].id;
const foundProduct = catalogModel.getProductById(testId);
console.log('\n1.2 getProductById("' + testId + '"):');
console.log('   Найденный товар:', foundProduct?.title, '-', foundProduct?.price, 'сигналов');

// setSelectedProduct + getSelectedProduct
catalogModel.setSelectedProduct(apiProducts.items[2]);
console.log('\n1.3 setSelectedProduct() + getSelectedProduct():');
console.log('   Выбранный товар:', catalogModel.getSelectedProduct()?.title);

catalogModel.setSelectedProduct(null);
console.log('   После сброса:', catalogModel.getSelectedProduct());


// ===== 2. ТЕСТИРОВАНИЕ BasketModel =====
console.log('\n=== 2. BasketModel ===');

const basketModel = new BasketModel();

// addItem — добавляем товары
basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
console.log('2.1 addItem() + getItems():');
console.log('   Товары в корзине:', basketModel.getItems().map(item => item.title).join(', '));

// getCount
console.log('\n2.2 getCount():', basketModel.getCount());

// getTotal
console.log('\n2.3 getTotal():', basketModel.getTotal(), 'сигналов');

// hasItem — проверка наличия
console.log('\n2.4 hasItem():');
console.log('   Товар "' + apiProducts.items[0].title + '" в корзине?', basketModel.hasItem(apiProducts.items[0].id));
console.log('   Товар "' + apiProducts.items[2].title + '" в корзине?', basketModel.hasItem(apiProducts.items[2].id));

// removeItem — удаление
basketModel.removeItem(apiProducts.items[0].id);
console.log('\n2.5 removeItem() после удаления первого товара:');
console.log('   Осталось товаров:', basketModel.getCount());
console.log('   Оставшиеся:', basketModel.getItems().map(item => item.title).join(', '));

// clear — очистка
basketModel.clear();
console.log('\n2.6 clear():');
console.log('   Корзина после очистки:', basketModel.getItems());


// ===== 3. ТЕСТИРОВАНИЕ BuyerModel =====
console.log('\n=== 3. BuyerModel ===');

const buyerModel = new BuyerModel();

// setData — частичное сохранение
buyerModel.setData({ email: 'test@example.com', phone: '+7 999 123-45-67' });
console.log('3.1 setData() частичное:');
console.log('   Текущие данные:', buyerModel.getData());

// validate — валидация (должна показать ошибки для payment и address)
console.log('\n3.2 validate() после частичного заполнения:');
const errors1 = buyerModel.validate();
if (Object.keys(errors1).length === 0) {
    console.log('   Ошибок нет');
} else {
    console.log('   Ошибки:', errors1);
}

// Добавляем остальные поля
buyerModel.setData({ payment: 'card', address: 'ул. Пушкина, д. 1' });
console.log('\n3.3 setData() полное:');
console.log('   Все данные:', buyerModel.getData());

// validate — валидация (ошибок быть не должно)
console.log('\n3.4 validate() после полного заполнения:');
const errors2 = buyerModel.validate();
if (Object.keys(errors2).length === 0) {
    console.log('   ✅ Ошибок нет, все поля валидны');
} else {
    console.log('   Ошибки:', errors2);
}

// clear — очистка
buyerModel.clear();
console.log('\n3.5 clear():');
console.log('   Данные после очистки:', buyerModel.getData());

// validate после очистки (должны быть ошибки по всем полям)
console.log('\n3.6 validate() после очистки:');
const errors3 = buyerModel.validate();
console.log('   Ошибки:', errors3);


// ===== 4. ТЕСТИРОВАНИЕ РАБОТЫ С СЕРВЕРОМ =====
console.log('\n=== 4. Работа с сервером ===');
console.log('4.1 getProducts() — загрузка реальных товаров с сервера:');

// Создаём экземпляр Api и передаём его в WebLarekAPI
const api = new Api(API_URL);
const weblarekApi = new WebLarekAPI(api);

weblarekApi.getProducts()
    .then(({ items, total }) => {
        console.log('   ✅ Получено товаров:', total);
        console.log('   Первые 3 товара:');
        items.slice(0, 3).forEach(item => {
            console.log(`      - ${item.title}: ${item.price ?? 'бесценно'} сигналов`);
        });
        
        // Сохраняем в модель каталога
        catalogModel.setItems(items);
        console.log('\n   ✅ Товары сохранены в CatalogModel');
        console.log('   В модели сейчас:', catalogModel.getItems().length, 'товаров');
    })
    .catch(error => {
        console.error('   ❌ Ошибка при загрузке товаров:', error);
    });

console.log('\n========== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ==========');