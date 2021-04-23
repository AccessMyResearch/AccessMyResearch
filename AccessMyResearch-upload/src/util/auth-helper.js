import { Auth } from "aws-amplify"

//Translations between Cognito group names and English-ified role names.
const GroupToRoles = {
    "AMR_Admin": "Administrator",
    "AMR_Expert": "Expert"
}

const RolesToGroups = {
    "Administrator": "AMR_Admin",
    "Expert": "AMR_Expert"
}

//A wrapper around Auth.currentAuthenticatedUser that returns null instead of throwing an error if the user is not logged in.
async function getCurrentUser(){
    try{
        return await Auth.currentAuthenticatedUser();
    }catch(e){
        return null;
    }
}

let AuthHelperRoles = {
    userRoles: ["Administrator", "Expert"],
    // Gets the array of roles that the user has based on their cognito groups.
    getUserRoles: async function (user) {
        if(user == null){
            user = await getCurrentUser();
            if(user == null)
                return [];
        }

        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        return AuthHelperRoles.translateGroupsToRoles(groups).roles;
    },
    isAdmin: async function (user) {
        let roles = await AuthHelperRoles.getUserRoles(user);
        return roles.includes("Administrator");
    },
    isExpert: async function (user) {
        let roles = await AuthHelperRoles.getUserRoles(user);
        return roles.includes("Expert");
    },
    //Translates the list of user Cognito groups into the website's roles. Not all Cognito groups map to a role. See below.
    translateGroupsToRoles: function(groups){
        //groups: an array of Cognito groups.
        let roles = [];

        //Cognito groups that are not website roles. This function separates them out and returns them so that any higher method that may attempt
        // to modify the user's roles knows to include the Cognito groups that aren't roles. So they aren't accidently deleted.
        let nativeGroups = [];

        if(!groups) groups = [];

        for (var i = 0; i < groups.length; i++) {
            let role = GroupToRoles[groups[i]];
            if(role != null)
                roles.push(role);
            else nativeGroups.push(groups[i]);
        }

        return { roles, nativeGroups };
    },
    //Translates a user's website roles back into the complete list of Cognito groups.
    translateRolesToGroups: function(roles, nativeGroups){
        //roles: an array of website roles
        //nativeGroups: an array of the native Cognito groups that didn't match to a role, returned by the translateGroupsToRoles function.
        let groups = [];

        if(!roles) roles = [];

        for(var i=0;i<roles.length;i++){
            let group = RolesToGroups[roles[i]];
            if(group != null)
                groups.push(group);
        }

        if(nativeGroups == null)
            nativeGroups = [];

        return groups.concat(nativeGroups);
    }
}

let AuthHelperAxios = {
    //Adds the Bearer authorization header to an HTTP request option object.
    attachAuthenticationHeader: async function(options){
        let user = await getCurrentUser();
        if(user == null)
            return;

        if(options.headers == null){
            options.headers = {};
        }

        options.headers["Authorization"] = `Bearer ${user.signInUserSession.accessToken.jwtToken}`;
    }
}

export { Auth, AuthHelperRoles, AuthHelperAxios };