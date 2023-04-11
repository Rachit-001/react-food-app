import React from "react";
import { useContext } from "react";

import "./style.css";
import { ThemeContext } from "../../App";
const ThemeButton = () => {
	const { theme, setTheme } = useContext(ThemeContext); // consume the context
	console.log(theme, setTheme);

	return (
		<button
			style={theme ? { backgroundColor: "#12343b" } : {}}
			onClick={() => setTheme(!theme)}
			className="themeButton"
		>
			Chnage Theme
		</button>
	);
};

export default ThemeButton;
