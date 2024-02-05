import React, { useState } from "react";
import keys from "./keys";
import "./App.css";

const api = {
	key: keys.API_KEY,
	base: keys.BASE_URL,
};

function App() {
	const dataBuild = (d) => {
		let date = String(new window.Date());
		date = date.slice(3, 15);
		return date;
	};

	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	// const search = (e) => {
	// 	e.key === "Enter"
	// 		? fetch(
	// 				`${
	// 					import.meta.env.VITE_BASE_URL
	// 				}weather?q=${query}&units=metric&APPID=${
	// 					import.meta.env.VITE_API_KEY
	// 				}`,
	// 				{
	// 					headers: {
	// 						accept: "application/json",
	// 						"User-agent": "learning app",
	// 					},
	// 				}
	// 		  )
	// 				.then((res) => res.json())
	// 				.then((results) => {
	// 					setQuery("");
	// 					setWeather(results);
	// 					console.log(results);
	// 				})
	// 		: e.key;
	// };

	async function search(e) {
		if (e.key === "Enter") {
			try {
				const result = await fetch(
					`${
						import.meta.env.VITE_BASE_URL
					}weather?q=${query}&units=metric&APPID=${
						import.meta.env.VITE_API_KEY
					}`,
					{
						headers: {
							accept: "application/json",
							"User-agent": "learning app",
						},
					}
				);

				if (!result.ok) {
					throw new Error(`API request failed with status ${result.status}`);
				}

				const contentType = result.headers.get("content-type");

				// Check if the response is in JSON format
				if (contentType && contentType.includes("application/json")) {
					const json = await result.json();
					setQuery("");
					setWeather(json);
				} else {
					console.error("Received non-JSON response");
				}
			} catch (error) {
				console.error("Error fetching data", error.message);
			}
		}
	}

	return (
		<div
			className={
				typeof weather.main != "undefined"
					? weather.main.temp > 18
						? "App hot"
						: "App cold"
					: "App"
			}
		>
			<main>
				<div className="search-container">
					<input
						type="text"
						placeholder="seacrh"
						className="search-bar"
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != "undefined" ? (
					<div>
						<div className="location-container">
							<div className="location">
								{weather.name},{weather.sys.country}
							</div>
							<div className="date">{dataBuild(new Date())}</div>
						</div>
						<div className="weather-container">
							<div className="temperature">
								{Math.round(weather.main.temp)}C
							</div>
							<div className="weather">{weather.weather[0].main}</div>
						</div>
					</div>
				) : (
					""
				)}
			</main>
		</div>
	);
}

export default App;
