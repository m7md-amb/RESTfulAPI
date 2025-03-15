import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  product: String,
  amount: Number,
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
