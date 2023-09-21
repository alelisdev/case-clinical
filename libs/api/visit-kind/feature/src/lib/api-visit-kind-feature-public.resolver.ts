
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListVisitKindInput,
  ApiVisitKindDataAccessPublicService,
  VisitKind,
} from '@case-clinical/api/visit-kind/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiVisitKindFeaturePublicResolver {
  constructor(private readonly service: ApiVisitKindDataAccessPublicService) {}
           
  @Query(() => [VisitKind], { nullable: true })
  publicVisitKinds(
    @Args({ name: 'input', type: () => UserListVisitKindInput, nullable: true }) input?: UserListVisitKindInput,
  ) {
    return this.service.publicVisitKinds(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountVisitKinds(
    @Args({ name: 'input', type: () => UserListVisitKindInput, nullable: true }) input?: UserListVisitKindInput,
  ) {
    return this.service.publicCountVisitKinds(input)
  }

  @Query(() => [VisitKind], { nullable: true })
  publicSelectVisitKinds(
    @Args({ name: 'input', type: () => UserListVisitKindInput, nullable: true }) input?: UserListVisitKindInput,
  ) {
    return this.service.publicSelectVisitKinds(input)
  }

  @Query(() => VisitKind, { nullable: true })
  publicVisitKind(@Args('visitKindId') visitKindId: string) {
    return this.service.publicVisitKind(visitKindId)
  }
}
