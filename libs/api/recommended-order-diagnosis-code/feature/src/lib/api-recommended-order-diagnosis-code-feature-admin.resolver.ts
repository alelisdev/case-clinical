
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRecommendedOrderDiagnosisCodeInput,
  AdminListRecommendedOrderDiagnosisCodeInput,
  AdminUpdateRecommendedOrderDiagnosisCodeInput,
  ApiRecommendedOrderDiagnosisCodeDataAccessAdminService,
  RecommendedOrderDiagnosisCode
} from '@case-clinical/api/recommended-order-diagnosis-code/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListDiagnosisCodeInput, DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'
import { AdminListRecommendedOrderInput, RecommendedOrder } from '@case-clinical/api/recommended-order/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRecommendedOrderDiagnosisCodeFeatureAdminResolver {
  constructor(private readonly service: ApiRecommendedOrderDiagnosisCodeDataAccessAdminService) {}

  @Query(() => [RecommendedOrderDiagnosisCode], { nullable: true })
  adminRecommendedOrderDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRecommendedOrderDiagnosisCodeInput, nullable: true }) input?: AdminListRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.adminRecommendedOrderDiagnosisCodes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRecommendedOrderDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRecommendedOrderDiagnosisCodeInput, nullable: true }) input?: AdminListRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.adminCountRecommendedOrderDiagnosisCodes(admin.id, input)
  }





  @Query(() => RecommendedOrderDiagnosisCode, { nullable: true })
  adminRecommendedOrderDiagnosisCode(@CtxUser() admin: User, @Args('recommendedOrderDiagnosisCodeId') recommendedOrderDiagnosisCodeId: string) {
    return this.service.adminRecommendedOrderDiagnosisCode(admin.id, recommendedOrderDiagnosisCodeId)
  }

  @Mutation(() => RecommendedOrderDiagnosisCode, { nullable: true })
  adminCreateRecommendedOrderDiagnosisCode(@CtxUser() admin: User, @Args('input') input: AdminCreateRecommendedOrderDiagnosisCodeInput,) {
    return this.service.adminCreateRecommendedOrderDiagnosisCode(admin.id, input)
  }

  @Mutation(() => RecommendedOrderDiagnosisCode, { nullable: true })
  adminUpdateRecommendedOrderDiagnosisCode(
    @CtxUser() admin: User,
    @Args('recommendedOrderDiagnosisCodeId') recommendedOrderDiagnosisCodeId: string,
    @Args('input') input: AdminUpdateRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.adminUpdateRecommendedOrderDiagnosisCode(admin.id, recommendedOrderDiagnosisCodeId, input)
  }

  @Mutation(() => RecommendedOrderDiagnosisCode, { nullable: true })
  adminDeleteRecommendedOrderDiagnosisCode(@CtxUser() admin: User, @Args('recommendedOrderDiagnosisCodeId') recommendedOrderDiagnosisCodeId: string) {
    return this.service.adminDeleteRecommendedOrderDiagnosisCode(admin.id, recommendedOrderDiagnosisCodeId)
  }
}

