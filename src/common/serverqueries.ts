import axios from "axios";

export const serverURL =
	process.env.NODE_ENV === "development" ? `http://localhost:4000` : "";

export interface AddUserArgs {
	username: string;
	email: string;
	spotify_id: string;
	access_token: string;
	refresh_token: string;
}

export async function addUser(user: AddUserArgs) {
	return axios({
		method: "POST",
		url: `${serverURL}/user`,
		data: user,
	});
}

export async function getSCPFromServer(accessToken: string) {
	return axios({
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		url: `${serverURL}/scp`,
	});
}

export async function getMeFromServer(accessToken: string) {
	return axios({
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		url: `${serverURL}/me`,
	});
}
