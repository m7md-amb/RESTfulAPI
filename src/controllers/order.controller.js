import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { product, amount } = req.body;

    const order = await Order.create({
      customerId: req.userId,  
      product,
      amount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, customerId: req.userId },  
      { status: "Cancelled" },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found or unauthorized" });

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const submitPayment = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, customerId: req.userId });

    if (!order) return res.status(404).json({ message: "Order not found or unauthorized" });
    if (order.status !== "Pending") return res.status(400).json({ message: "Order is not pending" });

    // async delay for payment processing
    setTimeout(async () => {
      order.status = "Completed";
      await order.save();
      res.json({ message: "Payment successful", order });
    }, 3000);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
