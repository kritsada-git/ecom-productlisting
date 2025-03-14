import db from "../config/db.js";

// ดึงส่วนลดทั้งหมด
export const getDiscounts = async (req, res) => {
  try {
    const [discounts] = await db.query("SELECT * FROM discounts");
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};

// ดึงส่วนลดตาม ID
export const getDiscountById = async (req, res) => {
  try {
    const { id } = req.params;
    const [discount] = await db.query("SELECT * FROM discounts WHERE id = ?", [id]);

    if (discount.length === 0) return res.status(404).json({ message: "Discount not found" });

    res.json(discount[0]);
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};

// เพิ่มส่วนลดใหม่
export const createDiscount = async (req, res) => {
  try {
    const { type, category, amount, itemCategory, everyAmount, discountAmount, description } = req.body;
    await db.query(
      "INSERT INTO discounts (type, category, amount, itemCategory, everyAmount, discountAmount, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [type, category, amount, itemCategory, everyAmount, discountAmount, description]
    );
    res.status(201).json({ message: "Discount created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};

// อัปเดตส่วนลด
export const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, itemCategory, everyAmount, discountAmount, description } = req.body;
    await db.query(
      "UPDATE discounts SET type=?, category=?, amount=?, itemCategory=?, everyAmount=?, discountAmount=?, description=? WHERE id=?",
      [type, category, amount, itemCategory, everyAmount, discountAmount, description, id]
    );
    res.json({ message: "Discount updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};

// ลบส่วนลด
export const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM discounts WHERE id=?", [id]);
    res.json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database Error", error });
  }
};
