const requests = {
	auth: {
		signIn: "auth/signin",
		signUp: "auth/signup",
		signOut: "auth/signout",
	},
	user: {
		all: "user/all",
		user: "user/",
	},
	chat: {
		sendMessage: "chat/send/message",
		sync: "chat/sync",
		last: "chat/last/message",
	},
};

export default requests;
