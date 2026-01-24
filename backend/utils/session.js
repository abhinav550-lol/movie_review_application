import session from "express-session";

export async function setSession(req , sessionSettings){
	for(const key in sessionSettings){
		req.session[key] = sessionSettings[key];
	}
} 

export async function destroySession(req){
	req.session.destroy();
}