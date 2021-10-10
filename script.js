console.clear();
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('search-field', {
    template: `<input >`
});

Vue.component('fetch-error', {
    template: `<div class='fetch-error'>Упс...ошибочка</div>`
});

Vue.component('basket', {
    props: ['cart-goods'],
    template: `<div class="basket-list" id="basket">
          <h2 class="basket-header">Корзина</h2>
          <div class="goods-item">
            <h3 id="amount">Всего товаров: {{cartGoods.countGoods}} шт. <br>Общая сумма: {{cartGoods.amount}} рублей </h3>
            <ol id="ol">
                <li v-for="good in cartGoods.contents">{{good.product_name}} - {{good.quantity}}шт. по цене: {{good.price}} рублей на сумму: {{good.quantity * good.price}} рублей</li>
            <button class="cart-button" value="submit" type="button">Купить</button>
            <button class="cart-button" id="remove">Очистить корзину</button>
          </div>
        </div>`
});

Vue.component('goods-list', {
    props: ['goods'],
    template: `<div>
      <div class="goods-list" v-if="goods.length !== 0">
          <h2>Список товаров</h2>
          <goods-item v-for="good of goods" :good="good"></goods-item>
      </div>
      <h1 v-else>Нет данных</h1>
</div>`,
});

Vue.component('goods-item', {
    props: ['good'],
    template: `<div class="goods-item">
       <h3>{{good.product_name}}</h3>
       <p>{{good.price}} рублей</p>
     </div>`,
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: true,
        cartGoods: [],
        fetchError: false,
    },
    mounted() {
        return new Promise(resolve => {
            fetch(`${API_URL}/catalogData.json`)
                .then(response => response.json())
                .then(json => {
                    this.goods = json;
                    this.filteredGoods = json;
                })
                .catch(error => this.fetchError = true)
        })
    },
    methods: {
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        fetchGoodsCart() {
            return new Promise(resolve => {
                fetch(`${API_URL}/getBasket.json`)
                    .then(response => response.json())
                    .then(json => {
                        this.cartGoods = json;

                    })
                    .catch(error => this.fetchError = true)
            })
        }
    },
});
