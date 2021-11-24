import React from "react";
import { UserContext } from "../../common/contexts/user.context";

function UserWidget() {
	const { user } = React.useContext(UserContext);

	if (!user || !user.user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex rounded-md bg-white p-2 max-h-20 space-x-2">
			<div className="h-full">
				<img
					src={user.user["images"][0]["url"]}
					className="h-12 w-12 rounded-lg"
					alt={`${user.user["display_name"]}`}
				/>
			</div>
			<div className="flex flex-col">
				<p>
					<div className="font-bold">{user.user["display_name"]}</div>
				</p>
				<p>
					<div>{user.user["email"]}</div>
				</p>
			</div>
		</div>
	);
}

export default UserWidget;
