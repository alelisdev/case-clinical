
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAwardInput,
  AdminListAwardInput,
  AdminUpdateAwardInput,
  ApiAwardDataAccessAdminService,
  Award
} from '@case-clinical/api/award/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAwardFeatureAdminResolver {
  constructor(private readonly service: ApiAwardDataAccessAdminService) {}

  @Query(() => [Award], { nullable: true })
  adminAwards(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAwardInput, nullable: true }) input?: AdminListAwardInput,
  ) {
    return this.service.adminAwards(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAwards(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAwardInput, nullable: true }) input?: AdminListAwardInput,
  ) {
    return this.service.adminCountAwards(admin.id, input)
  }





  @Query(() => Award, { nullable: true })
  adminAward(@CtxUser() admin: User, @Args('awardId') awardId: string) {
    return this.service.adminAward(admin.id, awardId)
  }

  @Mutation(() => Award, { nullable: true })
  adminCreateAward(@CtxUser() admin: User, @Args('input') input: AdminCreateAwardInput,) {
    return this.service.adminCreateAward(admin.id, input)
  }

  @Mutation(() => Award, { nullable: true })
  adminUpdateAward(
    @CtxUser() admin: User,
    @Args('awardId') awardId: string,
    @Args('input') input: AdminUpdateAwardInput,
  ) {
    return this.service.adminUpdateAward(admin.id, awardId, input)
  }

  @Mutation(() => Award, { nullable: true })
  adminDeleteAward(@CtxUser() admin: User, @Args('awardId') awardId: string) {
    return this.service.adminDeleteAward(admin.id, awardId)
  }
}

