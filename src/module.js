const STUB = {
  //URL:                {value: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses', name: "url", code: "U"},
  URL:                {value: 'http://localhost:8888', name: "url", code: "U"},
  CATALOG:            {value: '/catalogData', name: "catalog", code: "C"},
  GET_BASKET:         {value: '/getBasket', name: "get", code: "G"},
  ADD_TO_BASKET:      {value: '/addToBasket', name: "add", code: "A"},
  DELETE_FROM_BASKET: {value: '/deleteFromBasket', name: "delete", code: "D"}
};

export const API_URL = STUB.URL.value + STUB.CATALOG.value;
