import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { CompanyDTO } from '@netspaces/contracts';
import { GraphQLError } from 'graphql';

import { CompanyService } from '../../service/company.service';
import { Company, CompanyInput } from '../schema/company.graphql-model';

@Resolver((_of: undefined) => Company)
export class CompanyResolver {
	constructor(private readonly companyService: CompanyService) { }

	@Query((_returns) => [Company])
	async companys(): Promise<CompanyDTO[]> {
		return await this.companyService.getCompanys();
	}

	@Query((_returns) => Company)
	async company(@Args('id', { type: () => String }) id: string): Promise<CompanyDTO> {
		return await this.companyService.getCompanyById(id);
	}

	@ResolveReference()
	async resolveReference(reference: { __typename: string; _id: string }): Promise<CompanyDTO> {
		return await this.companyService.getCompanyById(reference._id);
	}

	@Mutation((_returns) => String)
	async createCompany(@Args('companyInput') companyInput: CompanyInput): Promise<string> {
		const createdCompanyResult = await this.companyService.createCompany(companyInput._id, companyInput.name);

		return createdCompanyResult.match<string>(
			(_) => {
				return 'Company created successfully';
			},
			(err) => {
				throw new GraphQLError(err.message);
			},
		);
	}
}
