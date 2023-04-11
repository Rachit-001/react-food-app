import React from "react";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

// useState
// useReducer -> to manage complex state
const Search = (props) => {
	// console.log(props);
	const {
		getDataFromSearchComponentCopy,
		apiCalledSuccess,
		setApiCalledSuccess,
		requestTakesTooMuchTime,
		setRequestTakesTooMuchTime,
	} = props;
	const [inputValue, setInputValue] = useState(""); //initial value

	// useContext
	const { theme } = useContext(ThemeContext);

	const handleInputValue = (event) => {
		const { value } = event.target;
		//set the updated state

		setInputValue(value);
		// console.log(value);

		// console.log(document.querySelector("input").value);
	};
	// console.log(inputValue);

	const handleSubmit = (event) => {
		event.preventDefault(); //to prevent default event like reload
		getDataFromSearchComponentCopy(inputValue);
	};

	useEffect(() => {
		if (apiCalledSuccess) {
			setInputValue("");
			setApiCalledSuccess(false);
		}
		// }, [apiCalledSuccess]);
	}, [apiCalledSuccess, setApiCalledSuccess]);

	return (
		<form className="Search" onSubmit={handleSubmit}>
			<input
				name="search"
				onChange={handleInputValue}
				value={inputValue}
				placeholder="Search Recipes"
				id="search"
			></input>
			<button style={theme ? { backgroundColor: "#12343b" } : {}} type="submit">
				Search
			</button>
		</form>
	);
};
export default Search;
