const API_URL = 'http://127.0.0.1:3000';

Vue.component('search-field', {
    template: `<input type="text">`
});

Vue.component('fetch-error', {
    template: `<div class='fetch-error'>Возникла ошибка...</div>`
});

Vue.component('basket', {
    props: ['cart-goods'],
    template: `<div class="basket-list" id="basket">
          <h2 class="basket-header">Корзина</h2>
          <div class="goods-item">
            <h3 id="amount">Всего товаров: {{cartGoods.countGoods}} шт. <br>Общая сумма: {{cartGoods.amount}} рублей </h3>
            <ol id="ol">
                <li v-for="good in cartGoods.contents">{{good.product_name}} - {{good.quantity}}шт. по цене: {{good.price}} рублей на сумму: {{good.quantity * good.price}} рублей.</li>
            <button class="cart-button" value="submit" type="button">Купить</button>
            <button class="cart-button" id="remove">Очистить корзину</button>
          </div>
        </div>`
});

Vue.component('goods-list', {
    props: ['goods', 'addToCart'],
    template: `<div>
      <div class="goods-list" v-if="goods.length !== 0">
          <goods-item v-for="good of goods" :good="good" :addToCart='addToCart'></goods-item>
      </div>
      <h1 v-else>Нет данных</h1>
</div>`,
});

Vue.component('goods-item', {
    props: ['good', 'addToCart'],
    template: `<div class="goods-item">
       <h3>{{good.product_name}}</h3>
       <p>{{good.price}} рублей</p>
       <input type="button" value="Добавить в корзину" class="add-to-cart" @click='addToCart'>
     </div>`,
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
        cartGoods: [],
        fetchError: false,
    },
    mounted() {
        return new Promise(resolve => {
            fetch(`${API_URL}/catalogData`)
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
        addToCart(good) {
            this.cartGoods.push(good);
        },
        fetchGoodsCart() {
            return new Promise(resolve => {
                fetch(`${API_URL}/addToCart`)
                    .then(response => response.json())
                    .then(json => {
                        this.cartGoods = json;
                    })
            })
        }
    },
});
