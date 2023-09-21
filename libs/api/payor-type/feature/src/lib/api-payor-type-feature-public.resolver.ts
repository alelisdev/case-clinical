
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPayorTypeInput,
  ApiPayorTypeDataAccessPublicService,
  PayorType,
} from '@case-clinical/api/payor-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPayorTypeFeaturePublicResolver {
  constructor(private readonly service: ApiPayorTypeDataAccessPublicService) {}
           
  @Query(() => [PayorType], { nullable: true })
  publicPayorTypes(
    @Args({ name: 'input', type: () => UserListPayorTypeInput, nullable: true }) input?: UserListPayorTypeInput,
  ) {
    return this.service.publicPayorTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPayorTypes(
    @Args({ name: 'input', type: () => UserListPayorTypeInput, nullable: true }) input?: UserListPayorTypeInput,
  ) {
    return this.service.publicCountPayorTypes(input)
  }

  @Query(() => [PayorType], { nullable: true })
  publicSelectPayorTypes(
    @Args({ name: 'input', type: () => UserListPayorTypeInput, nullable: true }) input?: UserListPayorTypeInput,
  ) {
    return this.service.publicSelectPayorTypes(input)
  }

  @Query(() => PayorType, { nullable: true })
  publicPayorType(@Args('payorTypeId') payorTypeId: string) {
    return this.service.publicPayorType(payorTypeId)
  }
}
