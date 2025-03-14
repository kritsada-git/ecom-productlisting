import React, { useState , useEffect } from "react";
import './css/Home.css';
import api from "../api.js";

const Home = () => {
	const [categories, setCategories] = useState([]);
	const [items, setItems] = useState([]);

	useEffect(() => {
		api.get("category")
			.then((response) => {
				setCategories(prevCategories => [{ id: 0, name: "ALL" }, ...response.data] );
				// console.log(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the products!", error);
			});
	}, []);

	useEffect(() => {
		api.get("item")
			.then((response) => {
				setItems(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the products!", error);
			});
	}, []);
	// console.log(categories)


	const [selectedCategory, setSelectedCategory] = useState(0);

	const products = items;

	const filteredProducts = products.filter(product => {
		if (selectedCategory !== 0 && product.category !== selectedCategory) {
			return false;
		}else if(selectedCategory == 0){
			return true;
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
						<div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>

							{
								categories.map((cat, index) => (
										<button key={index}
										        onClick={() => {
													setSelectedCategory(cat.id);
												}}
										        className={selectedCategory === cat.id ? "category-selected" : ""}
										>
											{cat.name}
										</button>
								))
								// 	Object.keys(categories).map((category) => (
								// 	<button
								// 		key={category.id}
								// 		onClick={() => {
								// 			setSelectedCategory(category);
								// 		}}
								// 		className={selectedCategory === category ? "category-selected" : ""}
								// 	>
								// 		{category.name}
								// 	</button>
								// ))
							}
						</div>
					</div>

					{/* Color Selection */}
					{/*{selectedCategory !== "All" && categories[selectedCategory].length > 0 && (*/}
					{/*	<div className="row">*/}
					{/*		<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>*/}
					{/*			{categories[selectedCategory].map((color) => (*/}
					{/*				<button*/}
					{/*					key={color}*/}
					{/*					onClick={() => setSelectedColor(color)}*/}
					{/*					className={selectedColor === color ? "color-selected" : ""}*/}
					{/*				>*/}
					{/*					{color}*/}
					{/*				</button>*/}
					{/*			))}*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*)}*/}
				</div>

				<div className="row">
					<div className="header">
						<p>Product List {filteredProducts.length > 0 ? `(${filteredProducts.length} items)` : ""}</p>
					</div>
				</div>

				{/* Product Grid */}
				<div className="row">
					<div className="product-grid">
						{filteredProducts.map((product) => {
							// console.log("Product:", product)
							return (<div key={product.id} className="product-card">
								<div className="product-image">
									{product.image ? (
										<img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/use-item-994788.png?f=webp' alt={product.name} />
									) : (
										<img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/use-item-994788.png?f=webp' alt={product.name}/>
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
							</div> )
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;