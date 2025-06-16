const orders = [
  {
    id: 1,
    totalPrice: '30.00',
    deliveryAddress: 'Rua Xablau',
    deliveryNumber: '237',
    saleDate: '1900-01-01T00:00:00.000Z',
    status: 'Pendente',
    userId: 2,
    sellerId: 3,
    customer: {
      id: 2,
      name: 'Usuario teste 1',
    },
    seller: {
      id: 3,
      name: 'Usuario teste 2',
    },
    products: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://res.cloudinary.com/diktmcfwj/image/upload/v1748989901/ldnxg9ysay1hqzbydspt.jpg',
        sellerId: 3,
        orderInfo: {
          quantity: 2,
        },
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        urlImage: 'http://res.cloudinary.com/diktmcfwj/image/upload/v1748989901/ldnxg9ysay1hqzbydspt.jpg',
        sellerId: 3,
        orderInfo: {
          quantity: 2,
        },
      },
    ],
  },
];

export default orders;
