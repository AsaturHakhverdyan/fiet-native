import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

export const GlobalContext = createContext();
const ClobalProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		getCurrentUser()
			.then(res => {
				if (res) {
					setIsLoggedIn(true);
					setUser(res);
				} else {
					setIsLoggedIn(false);
					setUser(null);
				}
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLoading,
				isLoggedIn,
				user,
				setUser,
				setIsLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default ClobalProvider;
