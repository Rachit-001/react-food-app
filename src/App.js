import React, { createContext, useState } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import ThemeButton from "./components/theme-button";
//should starts with function keyword /arrow functions
// component name should start with capital
//ypu should have component body (jsx) + component logic
// export that component to use outside

// const App = () => {
// 	return <div>This is the first Component</div>;
// };

// jsx
// returned by using createElement API
// this API has three parameters
// element -> div, p, h1, h2, span
// properties -> className, id, click
// children, body

// create the context
// provide the context //should be in root level
// consume the context

export const ThemeContext = createContext(null); // create the context
function App() {
	const [theme, setTheme] = useState(false); // provide the context //should be in root level

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
			}}
		>
			<div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
				<ThemeButton />
				<Homepage />
			</div>
		</ThemeContext.Provider>
	);
}

export default App;
