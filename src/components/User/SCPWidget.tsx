import React from "react";
import { UserContext } from "../../common/contexts/user.context";
import { GetSCPFromServer } from "../../common/serverqueries";

function SCPWidget() {
	const { user } = React.useContext(UserContext);
	const [scp, setScp] = React.useState<Record<string, any>>({});

	React.useEffect(() => {
		if (user && user.appAccessToken) {
			GetSCPFromServer(user.appAccessToken).then(({ data }) => {
				setScp(data);
			});
		}
	});

	if (!scp) {
		return <div>Loading widget...</div>;
	}

	return (
		<div className="bg-white rounded-lg p-2">
			<div>{scp["item"]}</div>
		</div>
	);
}

export default SCPWidget;
