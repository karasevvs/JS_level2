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
        this.fetchGoods();
    }

    applyData(jsonData) { }

    fetchGoods() {
        return makeGETRequest(`${API_URL}/${this.source}`)
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

    addGood(goodItem) {
        this.goods.push(goodItem);
        this.render();
    }

    deleteGood(goodId) {
        const indexToDelete = this.goods.findIndex((item) => item.id_product === goodId);
        this.goods.splice(indexToDelete, 1);
        this.render();
    }

    render() {
        this.listHtml = '';
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


let text_for_edit = "Дан большой текст, в котором для оформления прямой речи используются 'одинарные кавычки'. Придумать шаблон, который заменяет одинарные кавычки на двойные.";
let text_result = document.querySelector('.long_text').innerHTML = text_for_edit;

// шаблон замены
let mask = /'(.+)'/;
let test = mask.exec(text_for_edit);
let text_set = text_for_edit.replace(mask, '"$1"');

// создание и отображение текста
var article = document.querySelector("div.long_text");
var new_element = document.createElement("h4");
var element_text = document.createTextNode(text_set);
new_element.appendChild(element_text);
article.appendChild(new_element);




