import React, { Component } from "react";
import "../css/Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import { useCookies } from "react-cookie";

const Sidebar = ({ users, onChatClick }) => {
	console.log("SIDE USERS", users);

	const [cookies, setCookies] = useCookies(["userData"]);

	return (
		<div className="sidebar">
			<div className="sidebar_header">
				<Avatar className="sidebar_avatar" src={``} />
				<div className="sidebar_header_right">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className="sidebar_search">
				<div className="sidebar_search_container">
					<SearchIcon />
					<input
						className=""
						type="text"
						placeholder="Search your chats here"
						id="search"
					/>
				</div>
			</div>

			<div className="sidebar_chats">
				{users.map((user) =>
					user._id != cookies.userData.user._id ? (
						<SidebarChat user={user} onChatClick={() => onChatClick(user)} />
					) : (
						<p></p>
					)
				)}
			</div>
		</div>
	);
};

export default Sidebar;
