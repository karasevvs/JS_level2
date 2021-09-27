const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            console.log(xhr.readyState);
            if (xhr.readyState === 4) {
                if (xhr.status !== 200)
                    reject(xhr.responseText);
                resolve(xhr.responseText);
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    });
}

class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor(source = "") {
        this.goods = [];
        this.source = source;
        this.listHtml = '';
    }
    applyData(jsonData) {
        console.log(jsonData);
    }
    fetchGoods() {
        makeGETRequest(`${API_URL}/${this.source}`)
            .then((response) => {
                this.applyData(JSON.parse(response));
                this.render();
            })
            .catch((response) => {
                console.log(response);
            })
    }
    render() { }
}

class Catalog extends GoodsList {
    constructor() {
        super('catalogData.json');
    }

    calculateTotalPrice() {
        let totalPrice = 0;
        this.goods.forEach(good => {
            totalPrice += good.price;
        });
        return totalPrice;
    }

    applyData(jsonData) {
        this.goods = jsonData;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            this.listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = this.listHtml;
    }
}

class GoodsBasket extends GoodsList {
    constructor() {
        super('getBasket.json');
        this.totalPrice = 0;
        this.countGoods = 0;
    }

    applyData(jsonData) {
        this.goods = jsonData.contents;
        this.totalPrice = jsonData.amount;
        this.countGoods = jsonData.countGoods;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            this.listHtml += goodItem.render();
        });
        this.listHtml += `<div class ='basket-price'><span>Сумма: </span>${this.totalPrice}</div>`;
        this.listHtml += `<div class ='basket-count'><span>Количество: </span>${this.countGoods}</div>`;
        document.querySelector('.basket-list').innerHTML = this.listHtml;
    }
}

const catalog = new Catalog();
const basket = new GoodsBasket();

catalog.fetchGoods();
basket.fetchGoods();

