
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorAuthDmeInput,
  ApiPriorAuthDmeDataAccessPublicService,
  PriorAuthDme,
} from '@case-clinical/api/prior-auth-dme/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorAuthDmeFeaturePublicResolver {
  constructor(private readonly service: ApiPriorAuthDmeDataAccessPublicService) {}
           
  @Query(() => [PriorAuthDme], { nullable: true })
  publicPriorAuthDmes(
    @Args({ name: 'input', type: () => UserListPriorAuthDmeInput, nullable: true }) input?: UserListPriorAuthDmeInput,
  ) {
    return this.service.publicPriorAuthDmes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorAuthDmes(
    @Args({ name: 'input', type: () => UserListPriorAuthDmeInput, nullable: true }) input?: UserListPriorAuthDmeInput,
  ) {
    return this.service.publicCountPriorAuthDmes(input)
  }

  @Query(() => [PriorAuthDme], { nullable: true })
  publicSelectPriorAuthDmes(
    @Args({ name: 'input', type: () => UserListPriorAuthDmeInput, nullable: true }) input?: UserListPriorAuthDmeInput,
  ) {
    return this.service.publicSelectPriorAuthDmes(input)
  }

  @Query(() => PriorAuthDme, { nullable: true })
  publicPriorAuthDme(@Args('priorAuthDmeId') priorAuthDmeId: string) {
    return this.service.publicPriorAuthDme(priorAuthDmeId)
  }
}
