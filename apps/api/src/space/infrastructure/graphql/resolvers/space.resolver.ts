import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { SpaceDTO } from '@netspaces/contracts';
import { GraphQLError } from 'graphql';

import { SpaceService } from '../../service/space.service';
import {
  DeleteSpaceInput,
  Space,
  SpaceInput,
  UpdateSpaceInput,
} from '../schema/space.graphql-model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

@Resolver((_of: any) => Space)
export class SpaceResolver {
  constructor(
    private readonly spaceService: SpaceService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) { }

  @Query((_returns) => [Space])
  async spaces(): Promise<SpaceDTO[]> {
    return await this.spaceService.getSpaces();
  }

  @Query((_returns) => Space, { nullable: true })
  async space(
    @Args('id', { type: () => String }) id: string,
  ): Promise<SpaceDTO> {
    return await this.spaceService.getSpaceById(id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: string;
  }): Promise<SpaceDTO> {
    return await this.spaceService.getSpaceById(reference._id);
  }

  @Mutation((_returns) => String)
  async createSpace(
    @Args('spaceInput') spaceInput: SpaceInput,
  ): Promise<string> {
    this.logger.info('Creating space', { spaceId: spaceInput._id });

    const createdSpaceResult = await this.spaceService.createSpace(
      spaceInput._id,
      spaceInput.workspaceId,
      spaceInput.name,
      spaceInput.quantity,
      spaceInput.seats,
      spaceInput.amenitys,
      spaceInput.image
    );

    return createdSpaceResult.match<string>(
      (_) => {
        return 'Space created successfully';
      },
      (err) => {
        throw new GraphQLError(err.message);
      },
    );
  }

  @Mutation((_returns) => String)
  async updateSpace(
    @Args('spaceInput') updateSpaceInput: UpdateSpaceInput,
  ): Promise<string> {
    this.logger.info('Updating space', { spaceId: updateSpaceInput._id });

    const updatedSpaceResult = await this.spaceService.updateSpace(
      updateSpaceInput._id,
      updateSpaceInput.name,
      updateSpaceInput.quantity,
      updateSpaceInput.seats,
    );

    return updatedSpaceResult.match<string>(
      (_) => {
        return 'Space was updated successfully';
      },
      (err) => {
        throw new GraphQLError(err.message);
      },
    );
  }

  @Mutation((_returns) => String)
  async deleteSpace(
    @Args('deleteSpaceInput') deleteSpaceInput: DeleteSpaceInput,
  ): Promise<string> {
    this.logger.info('Deleting space', { spaceId: deleteSpaceInput._id });
    const deletedSpaceResult = await this.spaceService.deleteSpace(
      deleteSpaceInput._id,
    );

    return deletedSpaceResult.match<string>(
      (_) => {
        return 'Space was deleted successfully';
      },
      (err) => {
        throw new GraphQLError(err.message);
      },
    );
  }
}
