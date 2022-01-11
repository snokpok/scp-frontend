import React from "react";
import { UserContext } from "../../common/contexts/user.context";
import { GetSCPFromServer } from "../../common/serverqueries";

function SCPWidget() {
	const { user } = React.useContext(UserContext);
	const [scp, setScp] = React.useState<Record<string, any>>({});

	const fetchSCP = React.useCallback(() => {
		if (user && user.appAccessToken) {
			GetSCPFromServer(user.appAccessToken).then(({ data }) => {
				setScp(data);
			});
		}
	}, [user]);

	React.useEffect(() => {
		fetchSCP();
	}, [fetchSCP]);

	if (!scp) {
		return <div>Loading widget...</div>;
	}

	return (
		<div className="bg-white rounded-lg p-2 flex items-center space-x-4">
			<div className="rounded-full">
				<img
					src={scp["item"]?.album.images[2].url}
					className="rounded-full border-2 animate-spin"
					alt="Album cover"
				/>
			</div>
			<div>
				<div className="font-bold">{scp["item"]?.name}</div>
				<div>
					{scp["item"]?.artists.map((item: any) => item.name).join(", ")}
				</div>
			</div>
			<button
				onClick={() => {
					fetchSCP();
				}}
				className="bg-black p-2 text-white rounded-lg"
			>
				Refetch
			</button>
		</div>
	);
}

export default SCPWidget;
