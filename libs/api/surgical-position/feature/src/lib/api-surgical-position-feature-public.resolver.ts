
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListSurgicalPositionInput,
  ApiSurgicalPositionDataAccessPublicService,
  SurgicalPosition,
} from '@case-clinical/api/surgical-position/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiSurgicalPositionFeaturePublicResolver {
  constructor(private readonly service: ApiSurgicalPositionDataAccessPublicService) {}
           
  @Query(() => [SurgicalPosition], { nullable: true })
  publicSurgicalPositions(
    @Args({ name: 'input', type: () => UserListSurgicalPositionInput, nullable: true }) input?: UserListSurgicalPositionInput,
  ) {
    return this.service.publicSurgicalPositions(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountSurgicalPositions(
    @Args({ name: 'input', type: () => UserListSurgicalPositionInput, nullable: true }) input?: UserListSurgicalPositionInput,
  ) {
    return this.service.publicCountSurgicalPositions(input)
  }

  @Query(() => [SurgicalPosition], { nullable: true })
  publicSelectSurgicalPositions(
    @Args({ name: 'input', type: () => UserListSurgicalPositionInput, nullable: true }) input?: UserListSurgicalPositionInput,
  ) {
    return this.service.publicSelectSurgicalPositions(input)
  }

  @Query(() => SurgicalPosition, { nullable: true })
  publicSurgicalPosition(@Args('surgicalPositionId') surgicalPositionId: string) {
    return this.service.publicSurgicalPosition(surgicalPositionId)
  }
}
