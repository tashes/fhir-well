class ClaimResource extends Resource {
    constructor (resource) {
        super(resource);
    }

    getAmount () {
        let amountField = this._.resource.total;
        var currency_symbols = {
            'USD': '$', // US Dollar
            'EUR': '€', // Euro
            'CRC': '₡', // Costa Rican Colón
            'GBP': '£', // British Pound Sterling
            'ILS': '₪', // Israeli New Sheqel
            'INR': '₹', // Indian Rupee
            'JPY': '¥', // Japanese Yen
            'KRW': '₩', // South Korean Won
            'NGN': '₦', // Nigerian Naira
            'PHP': '₱', // Philippine Peso
            'PLN': 'zł', // Polish Zloty
            'PYG': '₲', // Paraguayan Guarani
            'THB': '฿', // Thai Baht
            'UAH': '₴', // Ukrainian Hryvnia
            'VND': '₫', // Vietnamese Dong
        };
        let amount = `${ ((currency_symbols[amountField.currency] !== undefined) ? (currency_symbols[amountField.currency]) : (amountField.currency) + ':') }${amountField.value}`;
        return amount;
    }

    getItems () {
        let itemsField = this._.resource.item;
        let items = itemsField.map(function (item) {
            return item.productOrService.text;
        });
        return items;
    }
}