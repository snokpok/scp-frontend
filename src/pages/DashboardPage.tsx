import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import { UserContext } from "../common/contexts/user.context";
import SCPWidget from "../components/User/SCPWidget";
import UserWidget from "../components/User/UserWidget";

const cookies = new Cookies();

function DashboardPage() {
	const { user, setUser } = React.useContext(UserContext);
	const navigate = useNavigate();
	const scpURLApi = "http://localhost:4000/scp";

	React.useEffect(() => {
		const appAccessToken = cookies.get("accessToken");
		if (!appAccessToken) {
			navigate("/", {
				replace: true,
			});
		} else {
			// try to fetch all info with this
			setUser((prev) => ({
				...prev,
				appAccessToken,
			}));
		}
	}, [navigate]);

	return (
		<div className="flex flex-col bg-green-600 w-screen min-h-screen items-center justify-center space-y-2">
			<div>
				<UserWidget />
			</div>
			<div className="flex flex-col items-center justify-center rounded-lg w-96 p-5 bg-white">
				<h1>
					<div className="font-bold text-lg">Welcome!</div>
				</h1>
				<div>You can access your currently playing song by this URL:</div>
				<input
					value={scpURLApi}
					readOnly
					className="p-2 bg-gray-300 rounded-sm"
				/>
				<br />
				<label htmlFor="access-token-spotify">Access token spotify</label>
				<input
					value={user.accessToken ?? ""}
					readOnly
					className="p-2 bg-gray-300 rounded-sm"
					id="access-token-spotify"
				/>
				<label htmlFor="refresh-token-spotify">Refresh token spotify</label>
				<input
					value={user.refreshToken ?? ""}
					readOnly
					className="p-2 bg-gray-300 rounded-sm"
					id="refresh-token-spotify"
				/>
				<br />
				<label htmlFor="access-token-app">
					Access token for this app (use this)
				</label>
				<input
					value={user.appAccessToken ?? ""}
					readOnly
					className="p-2 bg-gray-300 rounded-sm"
					id="access-token-app"
				/>
			</div>
			<div>
				<SCPWidget />
			</div>
		</div>
	);
}

export default DashboardPage;
