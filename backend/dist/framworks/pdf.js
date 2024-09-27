"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pdf = void 0;
const mongoose_1 = require("mongoose");
const pdfSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
    },
    pdf: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Pdf = (0, mongoose_1.model)("Pdf", pdfSchema);
