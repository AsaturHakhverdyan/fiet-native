import { useEffect, useState } from "react";

const useAppwrite = fn => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const res = await fn();
			if (res) {
				setData(res);
			}
		} catch (error) {
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	const refetch = () => fetchData();
	return { data, isLoading, refetch };
};

export default useAppwrite;
