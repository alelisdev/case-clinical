
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateInsuranceTypeInput,
  AdminListInsuranceTypeInput,
  AdminUpdateInsuranceTypeInput,
  ApiInsuranceTypeDataAccessAdminService,
  InsuranceType
} from '@case-clinical/api/insurance-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiInsuranceTypeFeatureAdminResolver {
  constructor(private readonly service: ApiInsuranceTypeDataAccessAdminService) {}

  @Query(() => [InsuranceType], { nullable: true })
  adminInsuranceTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInsuranceTypeInput, nullable: true }) input?: AdminListInsuranceTypeInput,
  ) {
    return this.service.adminInsuranceTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountInsuranceTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInsuranceTypeInput, nullable: true }) input?: AdminListInsuranceTypeInput,
  ) {
    return this.service.adminCountInsuranceTypes(admin.id, input)
  }





  @Query(() => InsuranceType, { nullable: true })
  adminInsuranceType(@CtxUser() admin: User, @Args('insuranceTypeId') insuranceTypeId: string) {
    return this.service.adminInsuranceType(admin.id, insuranceTypeId)
  }

  @Mutation(() => InsuranceType, { nullable: true })
  adminCreateInsuranceType(@CtxUser() admin: User, @Args('input') input: AdminCreateInsuranceTypeInput,) {
    return this.service.adminCreateInsuranceType(admin.id, input)
  }

  @Mutation(() => InsuranceType, { nullable: true })
  adminUpdateInsuranceType(
    @CtxUser() admin: User,
    @Args('insuranceTypeId') insuranceTypeId: string,
    @Args('input') input: AdminUpdateInsuranceTypeInput,
  ) {
    return this.service.adminUpdateInsuranceType(admin.id, insuranceTypeId, input)
  }

  @Mutation(() => InsuranceType, { nullable: true })
  adminDeleteInsuranceType(@CtxUser() admin: User, @Args('insuranceTypeId') insuranceTypeId: string) {
    return this.service.adminDeleteInsuranceType(admin.id, insuranceTypeId)
  }
}

