
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAdverseInsuranceStatusInput,
  AdminListAdverseInsuranceStatusInput,
  AdminUpdateAdverseInsuranceStatusInput,
  ApiAdverseInsuranceStatusDataAccessAdminService,
  AdverseInsuranceStatus
} from '@case-clinical/api/adverse-insurance-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAdverseInsuranceStatusFeatureAdminResolver {
  constructor(private readonly service: ApiAdverseInsuranceStatusDataAccessAdminService) {}

  @Query(() => [AdverseInsuranceStatus], { nullable: true })
  adminAdverseInsuranceStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAdverseInsuranceStatusInput, nullable: true }) input?: AdminListAdverseInsuranceStatusInput,
  ) {
    return this.service.adminAdverseInsuranceStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAdverseInsuranceStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAdverseInsuranceStatusInput, nullable: true }) input?: AdminListAdverseInsuranceStatusInput,
  ) {
    return this.service.adminCountAdverseInsuranceStatuses(admin.id, input)
  }





  @Query(() => AdverseInsuranceStatus, { nullable: true })
  adminAdverseInsuranceStatus(@CtxUser() admin: User, @Args('adverseInsuranceStatusId') adverseInsuranceStatusId: string) {
    return this.service.adminAdverseInsuranceStatus(admin.id, adverseInsuranceStatusId)
  }

  @Mutation(() => AdverseInsuranceStatus, { nullable: true })
  adminCreateAdverseInsuranceStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateAdverseInsuranceStatusInput,) {
    return this.service.adminCreateAdverseInsuranceStatus(admin.id, input)
  }

  @Mutation(() => AdverseInsuranceStatus, { nullable: true })
  adminUpdateAdverseInsuranceStatus(
    @CtxUser() admin: User,
    @Args('adverseInsuranceStatusId') adverseInsuranceStatusId: string,
    @Args('input') input: AdminUpdateAdverseInsuranceStatusInput,
  ) {
    return this.service.adminUpdateAdverseInsuranceStatus(admin.id, adverseInsuranceStatusId, input)
  }

  @Mutation(() => AdverseInsuranceStatus, { nullable: true })
  adminDeleteAdverseInsuranceStatus(@CtxUser() admin: User, @Args('adverseInsuranceStatusId') adverseInsuranceStatusId: string) {
    return this.service.adminDeleteAdverseInsuranceStatus(admin.id, adverseInsuranceStatusId)
  }
}

