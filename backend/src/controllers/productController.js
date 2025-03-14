import db from "../config/db.js";

// ดึงสินค้าทั้งหมด
export const getProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};

// ดึงสินค้าตาม ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (product.length === 0) return res.status(404).json({ message: "Product not found" });

    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};

// เพิ่มสินค้าใหม่
export const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    await db.query("INSERT INTO products (name, category, price) VALUES (?, ?, ?)", [name, category, price]);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};

// อัปเดตสินค้า
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;
    await db.query("UPDATE products SET name=?, category=?, price=? WHERE id=?", [name, category, price, id]);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};

// ลบสินค้า
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM products WHERE id=?", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};
