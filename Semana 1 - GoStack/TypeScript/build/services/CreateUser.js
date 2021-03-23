"use strict";
// To create: name, email, password;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
function createUser(_a) {
    var name = _a.name, email = _a.email, password = _a.password;
    var user = {
        name: name,
        email: email,
        password: password,
    };
    return user;
}
exports.createUser = createUser;
