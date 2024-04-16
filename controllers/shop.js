const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  const user = req.user;
  user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((cartProducts) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const user = req.user;
  let updatedCart;
  let newQty = 1;
  user
    .getCart()
    .then((cart) => {
      updatedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      if (products.length > 0) {
        //update qty
        const product = products[0];
        newQty += product.cartItem.qty;
        return product;
      }
      //add new product
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return updatedCart.addProduct(product, { through: { qty: newQty } });
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const user = req.user;
  user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

exports.getOrders = (req, res, next) => {
  const user = req.user;
  user.getOrders({ include: Product }).then((orders) => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders,
    });
  });
};

exports.postOrder = (req, res, next) => {
  const user = req.user;
  let resetCart;
  user
    .getCart()
    .then((cart) => {
      resetCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return user.createOrder().then((order) => {
        return order.addProducts(
          products.map((product) => {
            product.orderItem = { qty: product.cartItem.qty };
            return product;
          })
        );
      });
    })
    .then((order) => {
      return resetCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
