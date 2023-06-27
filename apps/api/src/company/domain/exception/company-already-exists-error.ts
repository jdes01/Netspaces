import { CompanyId } from '../model/value-objects';
import { CompanyError } from './company-error';

export class CompanyAlreadyExistsError extends CompanyError {
  public static withId(id: CompanyId): CompanyAlreadyExistsError {
    return new CompanyAlreadyExistsError(
      `Company with id ${id.value} already exists`,
    );
  }
}
