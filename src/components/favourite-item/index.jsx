import React from "react";
import { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";
const FavouriteItem = (props) => {
	const { id, image, title, removeFromFavourites } = props;
	const { theme } = useContext(ThemeContext);

	return (
		<div key={id} className="favourite-item">
			<div>
				<img src={image} alt="image of recipe" />
			</div>
			<p style={theme ? { color: "#12343b" } : {}}>{title}</p>
			<button
				type="button"
				style={theme ? { backgroundColor: "#12343b" } : {}}
				onClick={removeFromFavourites}
			>
				Remove from favourites
			</button>
		</div>
	);
};

export default FavouriteItem;
