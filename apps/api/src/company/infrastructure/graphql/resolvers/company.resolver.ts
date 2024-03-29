import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CompanyDTO, UserDTO } from '@netspaces/contracts';
import { GraphQLError } from 'graphql';

import { CompanyService } from '../../service/company.service';
import {
  Company,
  CompanyInput,
  DeleteCompanyInput,
} from '../schema/company.graphql-model';
import { User } from '../../../../user/infrastructure/graphql/schema/user.graphql-model';
import { UserService } from '../../../../user/infrastructure/service/user.service';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

@Resolver((_of: undefined) => Company)
export class CompanyResolver {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Query((_returns) => [Company])
  async companys(): Promise<CompanyDTO[]> {
    return await this.companyService.getCompanys();
  }

  @Query((_returns) => Company)
  async company(
    @Args('id', { type: () => String }) id: string,
  ): Promise<CompanyDTO> {
    return await this.companyService.getCompanyById(id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: string;
  }): Promise<CompanyDTO> {
    return await this.companyService.getCompanyById(reference._id);
  }

  @ResolveField(() => [User])
  async users(@Parent() company: Company): Promise<UserDTO[]> {
    return this.userService.getUsersByCompanyId(company._id);
  }

  @Mutation((_returns) => String)
  async createCompany(
    @Args('companyInput') companyInput: CompanyInput,
  ): Promise<string> {
    this.logger.info('Creating company', { companyId: companyInput._id });

    const createdCompanyResult = await this.companyService.createCompany(
      companyInput._id,
      companyInput.name,
    );
    return createdCompanyResult.match<string>(
      (_) => {
        return 'Company created successfully';
      },
      (err) => {
        throw new GraphQLError(err.message);
      },
    );
  }

  @Mutation((_returns) => String)
  async updateCompany(
    @Args('companyInput') companyInput: CompanyInput,
  ): Promise<string> {
    this.logger.info('Updating company', { companyId: companyInput._id });
    const updatedCompanyResult = await this.companyService.updateCompany(
      companyInput._id,
      companyInput.name,
    );

    return updatedCompanyResult.match<string>(
      (_) => {
        return 'Company updated successfully';
      },
      (err) => {
        throw new GraphQLError(err.message);
      },
    );
  }

  @Mutation((_returns) => String)
  async deleteCompany(
    @Args('deleteCompanyInput') deleteCompanyInput: DeleteCompanyInput,
  ): Promise<string> {
    this.logger.info('Deleting company', { companyId: deleteCompanyInput._id });
    const deletedCompanyResult = await this.companyService.deleteCompany(
      deleteCompanyInput._id,
    );

    return deletedCompanyResult.match<string>(
      (_) => {
        return 'Company removed successfully';
      },
      (err) => {
        throw new GraphQLError(err.message);
      },
    );
  }
}
