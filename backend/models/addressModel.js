import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
);

const Address = mongoose.model('Address', addressSchema);

export default Address;