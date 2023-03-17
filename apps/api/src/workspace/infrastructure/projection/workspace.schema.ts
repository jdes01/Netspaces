import { Document, Schema } from 'mongoose';

export const WorkspaceSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    __v: { type: Number, select: false },
});

export interface WorkspaceDocument extends Document {
    readonly _id: string;
    readonly name: string
    readonly description: string
}
