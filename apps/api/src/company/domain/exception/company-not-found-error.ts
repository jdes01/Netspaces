import { CompanyId } from '../model/value-objects';
import { CompanyError } from './company-error';

export class CompanyNotFoundError extends CompanyError {
  public static withId(id: CompanyId): CompanyNotFoundError {
    return new CompanyNotFoundError(`Company with id ${id.value} not found`);
  }
}
