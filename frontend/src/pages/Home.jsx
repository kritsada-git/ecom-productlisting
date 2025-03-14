import React, { useState } from "react";
import './css/Home.css';

const Home = () => {
	const categories = {
		All: [],
		Clothing: ["Red", "Blue", "Black"],
		Electronics: ["White", "Black", "Gray"],
		Accessories: ["Gold", "Silver", "Rose Gold"],
	};

	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedColor, setSelectedColor] = useState("");

	// สร้างข้อมูลสินค้าตัวอย่างที่มีข้อมูลเพิ่มเติม
	const products = Array.from({ length: 20 }, (_, index) => {
		const id = index + 1;
		const categoryKeys = Object.keys(categories).filter(cat => cat !== "All");
		const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

		let randomColor = "";
		if (categories[randomCategory].length > 0) {
			randomColor = categories[randomCategory][Math.floor(Math.random() * categories[randomCategory].length)];
		}

		return {
			id: id,
			name: `Product ${id}`,
			price: `฿${Math.floor(Math.random() * 10000) + 500}`,
			description: `This is a short description for product ${id}. It shows some product features.`,
			category: randomCategory,
			color: randomColor,
			image: null // ตั้งค่าเริ่มต้นเป็น null เพราะเรายังไม่มีรูปจริง
		};
	});

	// กรองสินค้าตามหมวดหมู่และสีที่เลือก
	const filteredProducts = products.filter(product => {
		if (selectedCategory !== "All" && product.category !== selectedCategory) {
			return false;
		}
		if (selectedColor !== "" && product.color !== selectedColor) {
			return false;
		}
		return true;
	});

	return (
		<div>
			<div className="container">
				{/* Header */}
				<div className="row">
					<div className="header">
						<p>Product List</p>
					</div>
				</div>

				{/* Filter Section */}
				<div className="filter-section">
					<div className="filter-title">Product Filter</div>

					{/* Category Selection */}
					<div className="row">
						<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
							{Object.keys(categories).map((category) => (
								<button
									key={category}
									onClick={() => {
										setSelectedCategory(category);
										setSelectedColor(""); // รีเซ็ตสีเมื่อเปลี่ยนหมวดหมู่
									}}
									className={selectedCategory === category ? "category-selected" : ""}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					{/* Color Selection */}
					{selectedCategory !== "All" && categories[selectedCategory].length > 0 && (
						<div className="row">
							<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
								{categories[selectedCategory].map((color) => (
									<button
										key={color}
										onClick={() => setSelectedColor(color)}
										className={selectedColor === color ? "color-selected" : ""}
									>
										{color}
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Product List Header */}
				<div className="row">
					<div className="header">
						<p>Product List {filteredProducts.length > 0 ? `(${filteredProducts.length} items)` : ""}</p>
					</div>
				</div>

				{/* Product Grid */}
				<div className="row">
					<div className="product-grid">
						{filteredProducts.map((product) => (
							<div key={product.id} className="product-card">
								<div className="product-image">
									{product.image ? (
										<img src={product.image} alt={product.name} />
									) : (
										<span>Product Image</span>
									)}
								</div>
								<div className="product-info">
									<div className="product-name">{product.name}</div>
									<div className="product-price">{product.price}</div>
									<div className="product-description">{product.description}</div>
									<div className="product-footer">
										<div className="product-category">
											{product.category} {product.color && `- ${product.color}`}
										</div>
										<button className="add-to-cart">Add to Cart</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;