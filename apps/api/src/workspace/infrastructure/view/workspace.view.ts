import { Document, Schema } from 'mongoose';

export const WorkspaceSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    __v: { type: Number, select: false },
});

export interface WorkspaceView extends Document {
    readonly _id: string;
    readonly name: string
    readonly description: string
}

export const WORKSPACE_VIEW = 'WORKSPACE_VIEW';
