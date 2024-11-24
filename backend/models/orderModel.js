import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: false },
        quantity: { type: Number, required: false },
        thumbnail: { type: String, required: false },
        price: { type: Number, required: false },
        menu: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: 'Menu',
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: false },
      address: { type: String, required: false },
      city: { type: String, required: false },
      postalCode: { type: String, required: false },
      state: { type: String, required: false },
      country: { type: String, required: false },
    },
    // cardDetails: {
    //   name: { type: String, required: true },
    //   cardNum: { type: Number, required: true },
    //   expDate: { type: Number, required: true },
    //   cvv: { type: Number, required: true },
    // },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    delivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
