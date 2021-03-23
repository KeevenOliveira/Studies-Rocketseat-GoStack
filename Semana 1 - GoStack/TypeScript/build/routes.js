"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitTypes = void 0;
var CreateUser_1 = require("./services/CreateUser");
function InitTypes(request, response) {
    var user = CreateUser_1.createUser({
        name: 'Keeven',
        email: 'contato.keevenoliveira@gmail.com',
        password: '123456',
        techs: ['Keeven', 'Kimberlly', 'Eduarda',
            {
                title: 'Java Spring', experience: 10
            }]
    });
    return response.json({ message: 'Hello World With TypeScript and Express' });
}
exports.InitTypes = InitTypes;
