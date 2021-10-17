"use strict"

import {API_URL} from '../src/module.js'; 

const app = new Vue ({
  el: '#app',
  data: {
    visibleIndex: true,
    visibleAbout: false,
    visibleCatalog: false,
    visibleCart: false,
    goods: [],
    basket: {},
    arrBasket: [],
  },
  methods: {
    showIndex: function() {      
      this.visibleIndex = true;
      this.visibleAbout = false;
      this.visibleCatalog = false;
      this.visibleCart = false;
    },
    showAbout: function() {
      this.visibleIndex = false;
      this.visibleAbout = true;
      this.visibleCatalog = false;
      this.visibleCart = false;
    },
    showCatalog: function() {
      this.visibleIndex = false;
      this.visibleAbout = false;
      this.visibleCatalog = true;
      this.visibleCart = false;
      //this.setBuyHundler();
    },
    showCart: function() {
      this.visibleIndex = false;
      this.visibleAbout = false;
      this.visibleCatalog = false;
      this.visibleCart = true;
    },
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
          let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
          xhr.open('GET', url, true);
          xhr.onload = () => resolve(this.goods = JSON.parse(xhr.responseText));
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();
      });
  },
    makePOSTRequest: function(url,data,callback) {
      return new Promise((resolve, reject) => {
          let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
          xhr.open("POST", url, true);
          xhr.onload = () => resolve(callback(xhr.responseText));
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send(data);
        });
    },
  },
  mounted(){
    this.arrBasket = [];
    this.makeGETRequest(API_URL);        
  },
  computed: {
    totalCost: function(){
      if(this.arrBasket.length > 0) {
        return this.arrBasket.reduce(function(sum,item){
          return sum + item.price;
        },0);
      }
      else {
        return 0;
      }
    },
  }

});  

Vue.component('app-nav', {
  data: function(){
    return {text:' '}
  },
  template:`
    <nav class="contentMargin backGroundColorDark" id="menu">
      <ul class="hr-menu">
        <li >
          <a href="#index" class="headerText" title="Index" id="menuIndex" @click="app.showIndex">ГЛАВНАЯ</a>
        </li>
        <li>
          <a href="#about" class="headerText" title="About" id="menuAbout" @click="app.showAbout">О КОМПАНИИ</a>
        </li>
        <li>
          <a href="#catalog" class="headerText" title="Catalog" id="menuCatalog" @click="app.showCatalog">КАТАЛОГ</a>
        </li>         
        <li>
          <a href="#cart" class="cart-button headerText" title="Cart" id="menuCart" @click="app.showCart">КОРЗИНА</a>
        </li>
      </ul>      
    </nav>  
  `,
});

Vue.component('app-index', {
  data: function(){
    return {
      textIndex:`Cillum dolore ea id anim cillum minim anim qui aliqua anim fugiat 
      laboris aute. Sunt culpa sint eiusmod magna adipisicing. Laboris 
      proident tempor amet commodo consequat sunt incididunt nisi anim 
      incididunt eu enim tempor. Exercitation nulla esse est cupidatat ut. 
      Exercitation consectetur eiusmod aliqua proident consectetur labore 
      deserunt ad. Officia aliqua cupidatat deserunt minim id reprehenderit 
      consequat dolore. Laboris ipsum Lorem consectetur consequat quis non occaecat.`
    }
  },
  template: 
    `<section id="Index" class="backGroundColorLight" v-show="app.visibleIndex">
      <div class="contentMargin">
      <div class="mainTitle titleCenter">ГЛАВНАЯ</div>
      <div class="hCenter" id="index">
        <div class="vBottom backGroundColorDark roundedCorner">                    
          <div class="contentMargin tarifText">
            {{textIndex}}  
          </div>                    
        </div>
      </div>
      </div>
    </section>` ,
});

Vue.component('app-about', {
  data: function(){
    return {
      textAbout:`Cillum dolore ea id anim cillum minim anim qui aliqua anim fugiat 
      laboris aute. Sunt culpa sint eiusmod magna adipisicing. Laboris 
      proident tempor amet commodo consequat sunt incididunt nisi anim 
      incididunt eu enim tempor. Exercitation nulla esse est cupidatat ut. 
      Exercitation consectetur eiusmod aliqua proident consectetur labore 
      deserunt ad. Officia aliqua cupidatat deserunt minim id reprehenderit 
      consequat dolore. Laboris ipsum Lorem consectetur consequat quis non occaecat.
      Mollit non cillum veniam in non cupidatat quis nostrud consectetur aliquip 
      proident ipsum esse. Pariatur et ea ipsum proident ut est Lorem. Enim anim 
      sint nostrud adipisicing sunt duis anim labore.`
    }
  },
  template: 
    `<section id="About" class="backGroundColorLight" v-show="app.visibleAbout">
      <div class="contentMargin">
      <div class="mainTitle titleCenter">О КОМПАНИИ</div>
      <div class="hCenter" id="index">
        <div class="vBottom backGroundColorDark roundedCorner">                    
          <div class="contentMargin tarifText">
            {{textAbout}}  
          </div>                    
        </div>
      </div>
      </div>
    </section>`,
}); 
Vue.component('app-catalog', {
  data: function(){
    return {
      goodTitle: 'КАТАЛОГ',
      goodButtonBuyTitle:'КУПИТЬ',
      goodText:`
      1. Porro officia cumque sint deleniti;      
      2. Тemo facere rem vitae odit;
      3. Cum odio, iste quia doloribus autem;
      4. Aperiam nulla ea neque.
      5. Porro officia cumque sint deleniti;
      6. Тemo facere rem vitae odit;<br>
      7. Cum odio, iste quia doloribus autem;
      8. Aperiam nulla ea neque.
      9. Porro officia cumque sint deleniti;
      10. Тemo facere rem vitae odit;
      11. Cum odio, iste quia doloribus autem;
      12. Aperiam nulla ea neque. `
    }
  },
  template: 
    `<section id="Catalog" class="backGroundColorLight" v-show="app.visibleCatalog">
        <div class="contentMargin">
          <div class="mainTitle titleCenter">{{goodTitle}}</div>
          <div class="hCenter" id="catalog">
              <div class="cart vBottom backGroundColorDark roundedCorner" v-for="good in app.goods">
                <template>
                  <div class="tarifTitle">{{good.product_name}}</div>
                  <div class="tarifPrice  backGroundColorLight">{{good.price}}</div>
                  <div class="tarifText">
                  1. Porro officia cumque sint deleniti;<br>
                  2. Тemo facere rem vitae odit;<br>
                  3. Cum odio, iste quia doloribus autem;<br>
                  4. Aperiam nulla ea neque.<br>
                  5. Porro officia cumque sint deleniti;<br>
                  6. Тemo facere rem vitae odit;<br>
                  7. Cum odio, iste quia doloribus autem;<br>
                  8. Aperiam nulla ea neque.<br>
                  9. Porro officia cumque sint deleniti;<br>
                  10. Тemo facere rem vitae odit;<br>
                  11. Cum odio, iste quia doloribus autem;<br>
                  12. Aperiam nulla ea neque.<br>
                  </div>    
                  <div class="buttonBuy textBuy" @click="app.arrBasket.push(app.goods.find(item => item.id_product === good.id_product))">
                    <a href="#">{{goodButtonBuyTitle}}</a>
                    <input type="hidden" class="idItem" v-model="good.id_product"></input>
                  </div>
                </template>
              </div>
        </div>
      </div>
    </section>`,
});

Vue.component('app-cart', {
  data: function(){
    return {
      textCart:``
    }
  },
  template: 
    `<section id="Cart" class="backGroundColorLight" v-show="visibleCart">
    <div class="contentMargin">
      <div class="mainTitle titleCenter">КОРЗИНА</div>
        <div class="hCenter" >
            <div class="tarifText backGroundColorDark">                    
              <table id="tableCart" cellspacing="0" cellpadding="5" style="width:100%;table-layout:fixed">
                <caption>Список товаров</caption>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Id</th>
                    <th>Товар</th>
                    <th>Цена</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <td colspan="3" style="text-align:right">ИТОГО:</td>
                    <td >{{totalCost}}</td>
                  </tr>
                </tfoot> 
                <tbody >
                  <template v-for="(item,index) in basket.arrBasket">
                    <tr>
                      <td>{{index + 1}}</td>
                      <td>{{item.id_product}}</td>
                      <td>{{item.product_name}}</td>
                      <td>{{item.price}}</td>
                    </tr>
                  </template>                 
                </tbody>
              </table>            
            </div>                                                                 
        </div>
    </div>
  </section>`,
});





