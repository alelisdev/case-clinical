
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAttorneyStatusInput,
  ApiAttorneyStatusDataAccessPublicService,
  AttorneyStatus,
} from '@case-clinical/api/attorney-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAttorneyStatusFeaturePublicResolver {
  constructor(private readonly service: ApiAttorneyStatusDataAccessPublicService) {}
           
  @Query(() => [AttorneyStatus], { nullable: true })
  publicAttorneyStatuses(
    @Args({ name: 'input', type: () => UserListAttorneyStatusInput, nullable: true }) input?: UserListAttorneyStatusInput,
  ) {
    return this.service.publicAttorneyStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAttorneyStatuses(
    @Args({ name: 'input', type: () => UserListAttorneyStatusInput, nullable: true }) input?: UserListAttorneyStatusInput,
  ) {
    return this.service.publicCountAttorneyStatuses(input)
  }

  @Query(() => [AttorneyStatus], { nullable: true })
  publicSelectAttorneyStatuses(
    @Args({ name: 'input', type: () => UserListAttorneyStatusInput, nullable: true }) input?: UserListAttorneyStatusInput,
  ) {
    return this.service.publicSelectAttorneyStatuses(input)
  }

  @Query(() => AttorneyStatus, { nullable: true })
  publicAttorneyStatus(@Args('attorneyStatusId') attorneyStatusId: string) {
    return this.service.publicAttorneyStatus(attorneyStatusId)
  }
}
