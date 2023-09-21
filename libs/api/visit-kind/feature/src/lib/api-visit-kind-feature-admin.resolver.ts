
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateVisitKindInput,
  AdminListVisitKindInput,
  AdminUpdateVisitKindInput,
  ApiVisitKindDataAccessAdminService,
  VisitKind
} from '@case-clinical/api/visit-kind/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiVisitKindFeatureAdminResolver {
  constructor(private readonly service: ApiVisitKindDataAccessAdminService) {}

  @Query(() => [VisitKind], { nullable: true })
  adminVisitKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListVisitKindInput, nullable: true }) input?: AdminListVisitKindInput,
  ) {
    return this.service.adminVisitKinds(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountVisitKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListVisitKindInput, nullable: true }) input?: AdminListVisitKindInput,
  ) {
    return this.service.adminCountVisitKinds(admin.id, input)
  }





  @Query(() => VisitKind, { nullable: true })
  adminVisitKind(@CtxUser() admin: User, @Args('visitKindId') visitKindId: string) {
    return this.service.adminVisitKind(admin.id, visitKindId)
  }

  @Mutation(() => VisitKind, { nullable: true })
  adminCreateVisitKind(@CtxUser() admin: User, @Args('input') input: AdminCreateVisitKindInput,) {
    return this.service.adminCreateVisitKind(admin.id, input)
  }

  @Mutation(() => VisitKind, { nullable: true })
  adminUpdateVisitKind(
    @CtxUser() admin: User,
    @Args('visitKindId') visitKindId: string,
    @Args('input') input: AdminUpdateVisitKindInput,
  ) {
    return this.service.adminUpdateVisitKind(admin.id, visitKindId, input)
  }

  @Mutation(() => VisitKind, { nullable: true })
  adminDeleteVisitKind(@CtxUser() admin: User, @Args('visitKindId') visitKindId: string) {
    return this.service.adminDeleteVisitKind(admin.id, visitKindId)
  }
}

