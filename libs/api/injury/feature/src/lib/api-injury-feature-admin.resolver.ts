
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateInjuryInput,
  AdminListInjuryInput,
  AdminUpdateInjuryInput,
  ApiInjuryDataAccessAdminService,
  Injury
} from '@case-clinical/api/injury/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiInjuryFeatureAdminResolver {
  constructor(private readonly service: ApiInjuryDataAccessAdminService) {}

  @Query(() => [Injury], { nullable: true })
  adminInjuries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInjuryInput, nullable: true }) input?: AdminListInjuryInput,
  ) {
    return this.service.adminInjuries(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountInjuries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInjuryInput, nullable: true }) input?: AdminListInjuryInput,
  ) {
    return this.service.adminCountInjuries(admin.id, input)
  }





  @Query(() => Injury, { nullable: true })
  adminInjury(@CtxUser() admin: User, @Args('injuryId') injuryId: string) {
    return this.service.adminInjury(admin.id, injuryId)
  }

  @Mutation(() => Injury, { nullable: true })
  adminCreateInjury(@CtxUser() admin: User, @Args('input') input: AdminCreateInjuryInput,) {
    return this.service.adminCreateInjury(admin.id, input)
  }

  @Mutation(() => Injury, { nullable: true })
  adminUpdateInjury(
    @CtxUser() admin: User,
    @Args('injuryId') injuryId: string,
    @Args('input') input: AdminUpdateInjuryInput,
  ) {
    return this.service.adminUpdateInjury(admin.id, injuryId, input)
  }

  @Mutation(() => Injury, { nullable: true })
  adminDeleteInjury(@CtxUser() admin: User, @Args('injuryId') injuryId: string) {
    return this.service.adminDeleteInjury(admin.id, injuryId)
  }
}

