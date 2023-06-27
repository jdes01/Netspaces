import { Company } from '../company/domain/model';
import { CompanyId } from '../company/domain/model/value-objects';
import { CompanyRepository } from '../company/domain/service/repository.service';

export class InMemoryCompanyRepository
  implements CompanyRepository<Company, CompanyId>
{
  public companys: Array<Company> = [];

  constructor(companys: Array<Company>) {
    this.companys = companys;
  }

  async find(id: CompanyId): Promise<Company | null> {
    const company = this.companys.find((company) => company.id.equals(id));
    return company ? Promise.resolve(company) : Promise.resolve(null);
  }

  save(entity: Company): void {
    const index = this.companys.findIndex((company) =>
      company.id.equals(entity.id),
    );
    if (index !== -1) {
      this.companys[index] = entity;
    } else {
      this.companys.push(entity);
    }
  }

  async delete(entity: Company): Promise<void> {
    return;
  }
}
