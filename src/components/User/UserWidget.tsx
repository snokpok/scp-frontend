import React from "react";
import { UserContext } from "../../common/contexts/user.context";
import { GetMeFromServer } from "../../common/serverqueries";

function UserWidget() {
	const { user, setUser } = React.useContext(UserContext);

	React.useEffect(() => {
		// fetch the user info with access token from data
		// if no access token then fetch the user from our db then update
		if (!user.accessToken && user.appAccessToken) {
			GetMeFromServer(user.appAccessToken).then(({ data }) => {
				setUser((prev) => ({
					...prev,
					accessToken: data.access_token,
					refreshToken: data.refresh_token,
					user: {
						display_name: data.username,
						email: data.email,
						spotify_id: data.spotify_id,
					},
				}));
			});
		}
	}, [user.appAccessToken]);

	if (!user || !user.user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex rounded-md bg-white p-2 max-h-20 space-x-2">
			<div className="flex flex-col">
				<p>
					<div className="font-bold">{user.user["display_name"]}</div>
				</p>
				<p>
					<div>{user.user["email"]}</div>
				</p>
				<p>
					<div>{user.user["spotify_id"]}</div>
				</p>
			</div>
		</div>
	);
}

export default UserWidget;
