
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateHealthInsuranceInput,
  AdminListHealthInsuranceInput,
  AdminUpdateHealthInsuranceInput,
  ApiHealthInsuranceDataAccessAdminService,
  HealthInsurance
} from '@case-clinical/api/health-insurance/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiHealthInsuranceFeatureAdminResolver {
  constructor(private readonly service: ApiHealthInsuranceDataAccessAdminService) {}

  @Query(() => [HealthInsurance], { nullable: true })
  adminHealthInsurances(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListHealthInsuranceInput, nullable: true }) input?: AdminListHealthInsuranceInput,
  ) {
    return this.service.adminHealthInsurances(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountHealthInsurances(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListHealthInsuranceInput, nullable: true }) input?: AdminListHealthInsuranceInput,
  ) {
    return this.service.adminCountHealthInsurances(admin.id, input)
  }





  @Query(() => HealthInsurance, { nullable: true })
  adminHealthInsurance(@CtxUser() admin: User, @Args('healthInsuranceId') healthInsuranceId: string) {
    return this.service.adminHealthInsurance(admin.id, healthInsuranceId)
  }

  @Mutation(() => HealthInsurance, { nullable: true })
  adminCreateHealthInsurance(@CtxUser() admin: User, @Args('input') input: AdminCreateHealthInsuranceInput,) {
    return this.service.adminCreateHealthInsurance(admin.id, input)
  }

  @Mutation(() => HealthInsurance, { nullable: true })
  adminUpdateHealthInsurance(
    @CtxUser() admin: User,
    @Args('healthInsuranceId') healthInsuranceId: string,
    @Args('input') input: AdminUpdateHealthInsuranceInput,
  ) {
    return this.service.adminUpdateHealthInsurance(admin.id, healthInsuranceId, input)
  }

  @Mutation(() => HealthInsurance, { nullable: true })
  adminDeleteHealthInsurance(@CtxUser() admin: User, @Args('healthInsuranceId') healthInsuranceId: string) {
    return this.service.adminDeleteHealthInsurance(admin.id, healthInsuranceId)
  }
}

