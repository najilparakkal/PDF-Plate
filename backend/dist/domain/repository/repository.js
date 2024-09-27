"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_1 = require("../../framworks/pdf");
const users_1 = require("../../framworks/users");
exports.default = {
    signUp: (userData, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findUser = yield users_1.Users.find({ email: userData.email });
            if (findUser.length === 0) {
                const newUser = yield users_1.Users.create({
                    email: userData.email,
                    userName: userData.userName,
                    password: password,
                });
                console.log(newUser);
                return { success: true, newUser };
            }
            else {
                return { success: false, message: "user already exists" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    signIn: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield users_1.Users.findOne({ email });
        }
        catch (error) {
            console.log(error);
        }
    }),
    upload: (email, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const uploadPdf = yield pdf_1.Pdf.create({
                userEmail: email,
                pdf: data,
            });
            return { success: true, uploadPdf };
        }
        catch (error) {
            console.log(error);
        }
    }),
    history: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield pdf_1.Pdf.find({ userEmail: email });
        }
        catch (error) {
            console.log(error);
        }
    })
};
