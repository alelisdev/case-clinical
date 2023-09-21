
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateEthnicityInput,
  AdminListEthnicityInput,
  AdminUpdateEthnicityInput,
  ApiEthnicityDataAccessAdminService,
  Ethnicity
} from '@case-clinical/api/ethnicity/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiEthnicityFeatureAdminResolver {
  constructor(private readonly service: ApiEthnicityDataAccessAdminService) {}

  @Query(() => [Ethnicity], { nullable: true })
  adminEthnicities(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEthnicityInput, nullable: true }) input?: AdminListEthnicityInput,
  ) {
    return this.service.adminEthnicities(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountEthnicities(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEthnicityInput, nullable: true }) input?: AdminListEthnicityInput,
  ) {
    return this.service.adminCountEthnicities(admin.id, input)
  }





  @Query(() => Ethnicity, { nullable: true })
  adminEthnicity(@CtxUser() admin: User, @Args('ethnicityId') ethnicityId: string) {
    return this.service.adminEthnicity(admin.id, ethnicityId)
  }

  @Mutation(() => Ethnicity, { nullable: true })
  adminCreateEthnicity(@CtxUser() admin: User, @Args('input') input: AdminCreateEthnicityInput,) {
    return this.service.adminCreateEthnicity(admin.id, input)
  }

  @Mutation(() => Ethnicity, { nullable: true })
  adminUpdateEthnicity(
    @CtxUser() admin: User,
    @Args('ethnicityId') ethnicityId: string,
    @Args('input') input: AdminUpdateEthnicityInput,
  ) {
    return this.service.adminUpdateEthnicity(admin.id, ethnicityId, input)
  }

  @Mutation(() => Ethnicity, { nullable: true })
  adminDeleteEthnicity(@CtxUser() admin: User, @Args('ethnicityId') ethnicityId: string) {
    return this.service.adminDeleteEthnicity(admin.id, ethnicityId)
  }
}

