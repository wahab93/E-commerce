import { apiHelper } from "../helper/apiHelper";

export const accountServices = {
    login: (login, user) => apiHelper.post(login, { ...user })
}



// import { apiHelper } from "../helper/apiHelper";

// export const accountServices = {
//     login
// }

// function login(login,user) {
//     return apiHelper.post(login, {
//         userId: user.userId,
//         userName: user.userName,
//         companyId: user.companyId,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         userPassword: user.userPassword,
//         userEmail: user.userEmail,
//         isActive: user.isActive,
//         isAdmin: user.isAdmin,
//         message: user.message
//     })
//         .then(user => {
//             return user;
//         });
// }