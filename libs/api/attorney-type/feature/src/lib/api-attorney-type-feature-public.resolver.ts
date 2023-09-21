
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAttorneyTypeInput,
  ApiAttorneyTypeDataAccessPublicService,
  AttorneyType,
} from '@case-clinical/api/attorney-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAttorneyTypeFeaturePublicResolver {
  constructor(private readonly service: ApiAttorneyTypeDataAccessPublicService) {}
           
  @Query(() => [AttorneyType], { nullable: true })
  publicAttorneyTypes(
    @Args({ name: 'input', type: () => UserListAttorneyTypeInput, nullable: true }) input?: UserListAttorneyTypeInput,
  ) {
    return this.service.publicAttorneyTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAttorneyTypes(
    @Args({ name: 'input', type: () => UserListAttorneyTypeInput, nullable: true }) input?: UserListAttorneyTypeInput,
  ) {
    return this.service.publicCountAttorneyTypes(input)
  }

  @Query(() => [AttorneyType], { nullable: true })
  publicSelectAttorneyTypes(
    @Args({ name: 'input', type: () => UserListAttorneyTypeInput, nullable: true }) input?: UserListAttorneyTypeInput,
  ) {
    return this.service.publicSelectAttorneyTypes(input)
  }

  @Query(() => AttorneyType, { nullable: true })
  publicAttorneyType(@Args('attorneyTypeId') attorneyTypeId: string) {
    return this.service.publicAttorneyType(attorneyTypeId)
  }
}
