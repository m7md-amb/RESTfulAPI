import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: customer._id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Customer registered successfully",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const loginCustomer = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const customer = await Customer.findOne({ email });
      if (!customer) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        { id: customer._id, email: customer.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.status(200).json({
        message: "Login successful",
        customer: {
          id: customer._id,
          name: customer.name,
          email: customer.email,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  