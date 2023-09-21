
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListImplantInput,
  ApiImplantDataAccessPublicService,
  Implant,
} from '@case-clinical/api/implant/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiImplantFeaturePublicResolver {
  constructor(private readonly service: ApiImplantDataAccessPublicService) {}
           
  @Query(() => [Implant], { nullable: true })
  publicImplants(
    @Args({ name: 'input', type: () => UserListImplantInput, nullable: true }) input?: UserListImplantInput,
  ) {
    return this.service.publicImplants(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountImplants(
    @Args({ name: 'input', type: () => UserListImplantInput, nullable: true }) input?: UserListImplantInput,
  ) {
    return this.service.publicCountImplants(input)
  }

  @Query(() => [Implant], { nullable: true })
  publicSelectImplants(
    @Args({ name: 'input', type: () => UserListImplantInput, nullable: true }) input?: UserListImplantInput,
  ) {
    return this.service.publicSelectImplants(input)
  }

  @Query(() => Implant, { nullable: true })
  publicImplant(@Args('implantId') implantId: string) {
    return this.service.publicImplant(implantId)
  }
}
