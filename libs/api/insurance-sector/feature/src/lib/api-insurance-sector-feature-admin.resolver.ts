
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateInsuranceSectorInput,
  AdminListInsuranceSectorInput,
  AdminUpdateInsuranceSectorInput,
  ApiInsuranceSectorDataAccessAdminService,
  InsuranceSector
} from '@case-clinical/api/insurance-sector/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiInsuranceSectorFeatureAdminResolver {
  constructor(private readonly service: ApiInsuranceSectorDataAccessAdminService) {}

  @Query(() => [InsuranceSector], { nullable: true })
  adminInsuranceSectors(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInsuranceSectorInput, nullable: true }) input?: AdminListInsuranceSectorInput,
  ) {
    return this.service.adminInsuranceSectors(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountInsuranceSectors(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInsuranceSectorInput, nullable: true }) input?: AdminListInsuranceSectorInput,
  ) {
    return this.service.adminCountInsuranceSectors(admin.id, input)
  }





  @Query(() => InsuranceSector, { nullable: true })
  adminInsuranceSector(@CtxUser() admin: User, @Args('insuranceSectorId') insuranceSectorId: string) {
    return this.service.adminInsuranceSector(admin.id, insuranceSectorId)
  }

  @Mutation(() => InsuranceSector, { nullable: true })
  adminCreateInsuranceSector(@CtxUser() admin: User, @Args('input') input: AdminCreateInsuranceSectorInput,) {
    return this.service.adminCreateInsuranceSector(admin.id, input)
  }

  @Mutation(() => InsuranceSector, { nullable: true })
  adminUpdateInsuranceSector(
    @CtxUser() admin: User,
    @Args('insuranceSectorId') insuranceSectorId: string,
    @Args('input') input: AdminUpdateInsuranceSectorInput,
  ) {
    return this.service.adminUpdateInsuranceSector(admin.id, insuranceSectorId, input)
  }

  @Mutation(() => InsuranceSector, { nullable: true })
  adminDeleteInsuranceSector(@CtxUser() admin: User, @Args('insuranceSectorId') insuranceSectorId: string) {
    return this.service.adminDeleteInsuranceSector(admin.id, insuranceSectorId)
  }
}

