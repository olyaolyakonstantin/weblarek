import { IBuyer } from '../../types';

export class BuyerModel implements IBuyer {
    payment: 'card' | 'cash' | null = null;
    email: string = '';
    phone: string = '';
    address: string = '';

    // Сохраняет переданные данные (частичное обновление)
    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) this.payment = data.payment;
        if (data.email !== undefined) this.email = data.email;
        if (data.phone !== undefined) this.phone = data.phone;
        if (data.address !== undefined) this.address = data.address;
    }

    // Возвращает все данные покупателя
    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    // Очищает все поля
    clear(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    // Валидация полей. Возвращает объект с ошибками (только для невалидных полей)
    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        if (!this.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.email.trim()) {
            errors.email = 'Укажите email';
        }

        if (!this.phone.trim()) {
            errors.phone = 'Укажите телефон';
        }

        if (!this.address.trim()) {
            errors.address = 'Укажите адрес доставки';
        }

        return errors;
    }
}