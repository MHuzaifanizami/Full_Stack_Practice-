import { Schema, model } from "mongoose";

const todoSchema = new Schema(
    {
        todo: { type: "string", required: "true" },
        ip: { type: "string" }
    },
    { timestamps: true }
);

export const Todo = model("todo" , todoSchema)