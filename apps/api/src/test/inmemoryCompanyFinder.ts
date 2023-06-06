import { CompanyDTO } from "@netspaces/contracts";
import { CompanyFinder } from "../company/application/service/company-finder.service";
import { CompanyId } from "../company/domain/model/value-objects";

export class InMemoryCompanyFinder implements CompanyFinder {
    private companys: CompanyDTO[] = []

    constructor(companys: Array<CompanyDTO>) {
        this.companys = companys
    }

    async find(id: CompanyId): Promise<CompanyDTO | null> {
        const company = this.companys.find(company => company._id === id.value);
        return company || null;
    }

    async findAll(): Promise<CompanyDTO[]> {
        return this.companys;
    }


}