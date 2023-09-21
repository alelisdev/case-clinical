
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureSiteInput,
  ApiProcedureSiteDataAccessPublicService,
  ProcedureSite,
} from '@case-clinical/api/procedure-site/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureSiteFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureSiteDataAccessPublicService) {}
           
  @Query(() => [ProcedureSite], { nullable: true })
  publicProcedureSites(
    @Args({ name: 'input', type: () => UserListProcedureSiteInput, nullable: true }) input?: UserListProcedureSiteInput,
  ) {
    return this.service.publicProcedureSites(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedureSites(
    @Args({ name: 'input', type: () => UserListProcedureSiteInput, nullable: true }) input?: UserListProcedureSiteInput,
  ) {
    return this.service.publicCountProcedureSites(input)
  }

  @Query(() => [ProcedureSite], { nullable: true })
  publicSelectProcedureSites(
    @Args({ name: 'input', type: () => UserListProcedureSiteInput, nullable: true }) input?: UserListProcedureSiteInput,
  ) {
    return this.service.publicSelectProcedureSites(input)
  }

  @Query(() => ProcedureSite, { nullable: true })
  publicProcedureSite(@Args('procedureSiteId') procedureSiteId: string) {
    return this.service.publicProcedureSite(procedureSiteId)
  }
}
