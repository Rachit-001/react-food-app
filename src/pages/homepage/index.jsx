import React from "react";
import Search from "../../components/search";
import { useCallback, useContext, useReducer, useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import RecipeItem from "../../components/recipe-item";
import FavouriteItem from "../../components/favourite-item";
import "./style.css";
import { ThemeContext } from "../../App";
//$env:NODE_OPTIONS = "--openssl-legacy-provider"  this to solve an error that comes at npm run build

const dummyData = "dummy";
// let flag = false;

// use reducer
const reducer = (state, action) => {
	switch (action.type) {
		case "filterFavourites":
			console.log(action);
			console.log(action.value);

			return {
				...state,
				filteredValue: action.value,
			};

		default:
			return state;
	}
};
const initialState = {
	filteredValue: "",
};

const Homepage = () => {
	//loading state
	const [loadingState, setLoadingState] = useState(false);

	// save the results that we receive from API

	const [recipes, setRecipes] = useState([]);

	// favourites data state
	const [favourites, setFavourites] = useState([]);
	// console.log(favourites);
	// console.log(typeof favourites);
	// state for api is successful or not
	const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

	// use reducer functionality
	const [filteredState, dispatch] = useReducer(reducer, initialState);

	// useContext
	const { theme } = useContext(ThemeContext);

	// to check if api takes too much time
	const [isInvalidInput, setIsInvalidInput] = useState(false); // didn't work as wanted it to be

	const [isEmptyInput, setIsEmptyInput] = useState(false);

	const getDataFromSearchComponent = (gotValue) => {
		// to check if search box is empty or not
		if (gotValue) {
			// keep the loading state as true before we are calling the API
			setLoadingState(true);
			console.log(gotValue, "get data ");

			// callinng the API

			async function getRecipes() {
				const apiResponse = await fetch(
					`https://api.spoonacular.com/recipes/complexSearch?apiKey=8181205c09bc4393a81b1b8e54eb74e8&query=${gotValue}`
				);
				const result = await apiResponse.json();

				const { results } = result;

				if (results && results.length > 0) {
					//set loading state as false again
					setLoadingState(false);

					// set the recipe state
					setRecipes(results);

					// set api called success status
					setApiCalledSuccess(true);

					// // set request takes too much time
					setIsInvalidInput(false); // here might be issue

					setIsEmptyInput(false);
				}
				if (results.length === 0) {
					setApiCalledSuccess(false);
					setLoadingState(false);
					setRecipes([]);
					// // set request takes too much time
					setIsInvalidInput(true); // here might be issue
					setIsEmptyInput(false);
				}

				// console.log(result);
			}
			getRecipes();

			// -----------------------

			// ----------------------
			// if request takes too much time

			// setTimeout(() => {
			// 	if (isInvalidInput) {
			// 		clearTimeout(timer);
			// 		setLoadingState(false);
			// 		// set request takes too much time
			// 		console.log(isInvalidInput, "request time");
			// 		// setIsInvalidInput(true);
			// 		console.log(isInvalidInput, "request time");
			// 		// set api called success status
			// 		// setApiCalledSuccess(true); // to set input vale ""
			// 		// set api called success status
			// 		setApiCalledSuccess(false); // to set final api call success

			// 		// setRecipes([]);
			// 	}
			// }, 10000);
		} else {
			setRecipes([]);
			setApiCalledSuccess(false);
			setLoadingState(false);
			setIsInvalidInput(false);
			setIsEmptyInput(true);
		}
		// -------------------------

		// to scroll to the start of recipes list
		const scrollToItems = document.querySelector(".item");

		scrollToItems.scrollIntoView({
			behavior: "smooth",
			block: "start",
			// block: "center",
			inline: "nearest", //not sure
		});

		// -------------------------
	};

	// console.log(loadingState, recipes, "loadingState, recipes");

	// addToFavourites using useCallback hook
	const addToFavourites = useCallback(
		(getCurrentRecipeItem) => {
			console.log(typeof favourites);
			console.log(getCurrentRecipeItem);
			// let cpyFavourites = [];// tried it when trying to solve error
			let cpyFavourites = [...favourites];
			// console.log(cpyFavourites);
			// console.log(favourites);

			// ----------------------------------------
			// don't use this for now-----------------------
			// const indexNew = favourites.findIndex(
			// 	(item) => item.id === getCurrentRecipeItem.id
			// );
			// console.log(indexNew);
			// if (indexNew === -1) {
			// 	setFavourites((favourites) => [...favourites, getCurrentRecipeItem]);
			// 	// save the favourites in local storage
			// 	localStorage.setItem("favourites", JSON.stringify(favourites)); // trid doing this but will not work reason might be because useState array is empty , not sure though or might be bcz we need to save he current or updated the favorites item into local storage.
			// } else {
			// 	alert("Item is already present in favourites");
			// }
			// --------------------------------------------

			// --------------------------------
			const index = cpyFavourites.findIndex(
				(item) => item.id === getCurrentRecipeItem.id
			);
			console.log(index);
			if (index === -1) {
				cpyFavourites.push(getCurrentRecipeItem);
				setFavourites(cpyFavourites);
				// save the favourites in local storage
				localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
				window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to the top of window
			} else {
				alert("Item is already present in favourites");
			}
			// ---------------------------------
		},
		[favourites]
	);

	// add to favourites********
	// const addToFavourites = (getCurrentRecipeItem) => {
	// 	console.log(typeof favourites);
	// 	console.log(getCurrentRecipeItem);
	// 	// let cpyFavourites = [];// tried it when trying to solve error
	// 	let cpyFavourites = [...favourites];
	// 	// console.log(cpyFavourites);
	// 	// console.log(favourites);

	// 	// ----------------------------------------
	// 	// don't use this for now-----------------------
	// 	// const indexNew = favourites.findIndex(
	// 	// 	(item) => item.id === getCurrentRecipeItem.id
	// 	// );
	// 	// console.log(indexNew);
	// 	// if (indexNew === -1) {
	// 	// 	setFavourites((favourites) => [...favourites, getCurrentRecipeItem]);
	// 	// 	// save the favourites in local storage
	// 	// 	localStorage.setItem("favourites", JSON.stringify(favourites)); // trid doing this but will not work reason might be because useState array is empty , not sure though or might be bcz we need to save he current or updated the favorites item into local storage.
	// 	// } else {
	// 	// 	alert("Item is already present in favourites");
	// 	// }
	// 	// --------------------------------------------

	// 	// --------------------------------
	// 	const index = cpyFavourites.findIndex(
	// 		(item) => item.id === getCurrentRecipeItem.id
	// 	);
	// 	console.log(index);
	// 	if (index === -1) {
	// 		cpyFavourites.push(getCurrentRecipeItem);
	// 		setFavourites(cpyFavourites);
	// 		// save the favourites in local storage
	// 		localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
	// 	} else {
	// 		alert("Item is already present in favourites");
	// 	}
	// 	// ---------------------------------
	// };

	// console.log(favourites, "favourites");

	// to show favourites
	useEffect(() => {
		// console.log("runs only once on page load if no dependancy");
		const extractFavouritesFromLocalStorageOnOageLoad =
			JSON.parse(localStorage.getItem("favourites")) || [];
		// console.log(extractFavouritesFromLocalStorageOnOageLoad);
		setFavourites(extractFavouritesFromLocalStorageOnOageLoad);
	}, []);
	// console.log(favourites);

	// remove from favourites
	const removeFromFavourites = (getCurrentId) => {
		let cpyFavourites = [...favourites];
		cpyFavourites = cpyFavourites.filter((item) => item.id !== getCurrentId);
		setFavourites(cpyFavourites);
		localStorage.setItem("favourites", JSON.stringify(cpyFavourites));
	};
	// --------------
	// api call
	// console.log(apiCalledSuccess);

	// ------------------
	// filtered state using use reducer
	console.log(filteredState, "filtered State");

	// -------------------------------

	// ------------------------------
	console.log(favourites, "favourites");
	// console.log(typeof favourites, "favourites type");
	// console.log(Array.isArray(favourites), "array or not");

	//----------------------------------*****
	// filter the favourites

	const filteredFavouritesItems =
		favourites && favourites.length > 0
			? favourites.filter(
					(item) =>
						item.title
							.toLowerCase()
							.includes(filteredState.filteredValue.toLowerCase()) // error was because of {} in arroe function Be careful
			  )
			: [];

	// --- if you want to use {} then have to return the value explicitly
	// ((item) => {
	// 	return item.title.toLowerCase().includes(filteredState.filteredValue);
	// });

	//----------------------------------*****
	// console.log(filteredFavouritesItems, "filteredFavouritesItems"); //for error soloving
	// console.log(filteredState.filteredValue); //for error soloving

	// ----------------------------

	const renderRecipes = useCallback(() => {
		if (recipes && recipes.length > 0) {
			return recipes.map((item) => (
				<RecipeItem
					addToFavourites={() => addToFavourites(item)}
					id={item.id}
					image={item.image}
					title={item.title}
				/>
			));
		}
	}, [recipes, addToFavourites]); //note I don't get any error here bcz of addToFavourites , don't know why?

	// ---------------------------------------
	return (
		<div className="homepage">
			<Search
				getDataFromSearchComponentCopy={getDataFromSearchComponent}
				dummyDataCopy={dummyData}
				apiCalledSuccess={apiCalledSuccess}
				setApiCalledSuccess={setApiCalledSuccess}
			/>
			{/* ============================================================== */}
			{isInvalidInput && (
				<>
					<div className="no-items">Invalid Input</div>
					<div className="no-items">Enter valid Input</div>
				</>
			)}

			{/* ============================================================== */}

			{isEmptyInput && (
				<>
					<div className="no-items">Empty Input</div>
					<div className="no-items">Enter valid Input</div>
				</>
			)}
			{/* ============================================================== */}

			{/* show faavourite items */}
			<div className="favourites-wrapper">
				<h1
					style={theme ? { color: "#12343b" } : {}}
					className="favourites-title"
				>
					Favourites
				</h1>
				<div className="search-favourites">
					<input
						onChange={(event) =>
							dispatch({ type: "filterFavourites", value: event.target.value })
						}
						value={filteredState.filteredValue}
						name="searchfavourites"
						placeholder="Search Favourites"
					></input>
				</div>
				<div className="favourites">
					{!filteredFavouritesItems.length && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								width: "100%",
							}}
							className="no-items"
						>
							No favourite recipes are found
						</div>
					)}
					{filteredFavouritesItems && filteredFavouritesItems.length > 0
						? filteredFavouritesItems.map((item) => (
								<FavouriteItem
									removeFromFavourites={() => removeFromFavourites(item.id)}
									id={item.id}
									image={item.image}
									title={item.title}
								/>
						  ))
						: null}
				</div>
			</div>
			{/* show faavourite items */}
			{/* show loading state */}
			{loadingState && (
				<div className="loading">Loading recipes ! Please wait.</div>
			)}
			{/* show loading state */}
			{/* map(or render) through all the reccipes */}
			<div className="item">
				{/* using useCallback below*/}
				{/* {renderRecipes()}
				 */}

				{/* using useMemo below*/}
				{useMemo(
					() =>
						!loadingState && recipes && recipes.length > 0
							? recipes.map((item) => (
									<RecipeItem
										addToFavourites={() => addToFavourites(item)}
										id={item.id}
										image={item.image}
										title={item.title}
									/>
							  ))
							: null,
					[loadingState, recipes, addToFavourites]
				)}
				{/* {recipes && recipes.length > 0
					? recipes.map((item) => (
							<RecipeItem
								addToFavourites={() => addToFavourites(item)}
								id={item.id}
								image={item.image}
								title={item.title}
							/>
					  ))
					: null} */}
			</div>

			{/* -------------------- */}

			{/* map through all recipes */}
			{!loadingState && !recipes.length && (
				<div className="no-items">No recipes are found</div>
			)}
			{/* -------------------- */}

			{/* if request takes too much time */}
			{/* {!loadingState && !recipes.length && isInvalidInput && (
				<>
					<div className="no-items">Too much time taken</div>
					
				</>
				
			)} */}
		</div>
	);
};

export default Homepage;
