import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../common/contexts/user.context";
import { getMeFromSpotify, requestToken } from "../common/queryfunctions";
import { addUser } from "../common/serverqueries";

function CallbackRedirectivePage() {
	const { setUser } = React.useContext(UserContext);
	const navigate = useNavigate();
	const [startRedirect, setStartRedirect] = React.useState(false);
	let query = React.useMemo(
		() => new URLSearchParams(window.location.search),
		[]
	);

	const handleQueryParseAuth = React.useCallback(() => {
		if (!query.get("code")) {
			alert("please accept the permissions");
		} else {
			requestToken(query.get("code") as string).then((res) => {
				const accessToken = res.data["access_token"];
				const refreshToken = res.data["refresh_token"];
				getMeFromSpotify(accessToken).then(({ data: myData }) => {
					if (accessToken && refreshToken) {
						const username = myData["display_name"];
						const email = myData["email"];
						const spotifyId = myData["id"];
						addUser({
							username,
							email,
							access_token: accessToken,
							refresh_token: refreshToken,
							spotify_id: spotifyId,
						}).then(({ data }) => {
							const appAccessToken = data["data"]["token"];
							setUser((prev) => ({
								...prev,
								appAccessToken,
							}));
							document.cookie = `accessToken=${appAccessToken}; path=/`;
						});
						setUser((prev) => ({
							...prev,
							user: myData,
							accessToken,
							refreshToken,
						}));
						setStartRedirect(true);
					} else {
						alert(
							"something went wrong with the access token retrieval process"
						);
					}
				});
			});
		}
	}, [query, setUser]);

	React.useEffect(() => {
		if (startRedirect)
			navigate("/dashboard", {
				replace: true,
			});
	}, [startRedirect, navigate]);

	React.useEffect(() => {
		handleQueryParseAuth();
	}, [handleQueryParseAuth]);

	return (
		<div>
			<div>Wait a bit...</div>
		</div>
	);
}

export default CallbackRedirectivePage;
