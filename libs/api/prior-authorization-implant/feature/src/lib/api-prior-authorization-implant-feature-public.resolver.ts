
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorAuthorizationImplantInput,
  ApiPriorAuthorizationImplantDataAccessPublicService,
  PriorAuthorizationImplant,
} from '@case-clinical/api/prior-authorization-implant/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorAuthorizationImplantFeaturePublicResolver {
  constructor(private readonly service: ApiPriorAuthorizationImplantDataAccessPublicService) {}
           
  @Query(() => [PriorAuthorizationImplant], { nullable: true })
  publicPriorAuthorizationImplants(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationImplantInput, nullable: true }) input?: UserListPriorAuthorizationImplantInput,
  ) {
    return this.service.publicPriorAuthorizationImplants(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorAuthorizationImplants(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationImplantInput, nullable: true }) input?: UserListPriorAuthorizationImplantInput,
  ) {
    return this.service.publicCountPriorAuthorizationImplants(input)
  }

  @Query(() => [PriorAuthorizationImplant], { nullable: true })
  publicSelectPriorAuthorizationImplants(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationImplantInput, nullable: true }) input?: UserListPriorAuthorizationImplantInput,
  ) {
    return this.service.publicSelectPriorAuthorizationImplants(input)
  }

  @Query(() => PriorAuthorizationImplant, { nullable: true })
  publicPriorAuthorizationImplant(@Args('priorAuthorizationImplantId') priorAuthorizationImplantId: string) {
    return this.service.publicPriorAuthorizationImplant(priorAuthorizationImplantId)
  }
}
