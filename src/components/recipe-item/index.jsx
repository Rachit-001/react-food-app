import React from "react";
import { useContext } from "react";

import "./style.css";
import { ThemeContext } from "../../App";
const RecipeItem = (props) => {
	const { id, image, title, addToFavourites } = props;
	// console.log(props, "recipe-item-props");

	const { theme } = useContext(ThemeContext);
	return (
		<div key={id} className="recipe-item">
			<div>
				<img src={image} alt="image of recipe" />
			</div>
			<p style={theme ? { color: "#12343b" } : {}}>{title}</p>
			<button
				type="button"
				style={theme ? { backgroundColor: "#12343b" } : {}}
				onClick={addToFavourites}
			>
				Add to favourites
			</button>
		</div>
	);
};

export default RecipeItem;
