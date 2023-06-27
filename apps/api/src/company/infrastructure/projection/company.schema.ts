import { CompanyDTO } from '@netspaces/contracts';
import { Document, Schema } from 'mongoose';

export const COMPANY_PROJECTION = 'companys';

export type CompanyDocument = CompanyDTO & Document;

export const CompanySchema = new Schema(
  {
    _id: String,
    name: String,
  },
  {
    versionKey: false,
  },
);
