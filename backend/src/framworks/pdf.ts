import mongoose, { Schema, model, Document } from "mongoose";

interface IPdf extends Document {
  userEmail: string;
  pdf: string;
}

const pdfSchema = new Schema<IPdf>(
  {
    userEmail: {
      type: String,
    },
    pdf: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Pdf = model<IPdf>("Pdf", pdfSchema);
