
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateRecommendedOrderDiagnosisCodeInput,
  UserListRecommendedOrderDiagnosisCodeInput,
  UserUpdateRecommendedOrderDiagnosisCodeInput,
  UserUpdateRecommendedOrderDiagnosisCodesInput,
  ApiRecommendedOrderDiagnosisCodeDataAccessUserService,
  RecommendedOrderDiagnosisCode,
} from '@case-clinical/api/recommended-order-diagnosis-code/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListDiagnosisCodeInput, DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'
import { UserListRecommendedOrderInput, RecommendedOrder } from '@case-clinical/api/recommended-order/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiRecommendedOrderDiagnosisCodeFeatureUserResolver {
  constructor(private readonly service: ApiRecommendedOrderDiagnosisCodeDataAccessUserService) {}

  @Query(() => [RecommendedOrderDiagnosisCode], { nullable: true })
  userRecommendedOrderDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderDiagnosisCodeInput, nullable: true }) input?: UserListRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.userRecommendedOrderDiagnosisCodes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountRecommendedOrderDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderDiagnosisCodeInput, nullable: true }) input?: UserListRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.userCountRecommendedOrderDiagnosisCodes(user.id, input)
  }

  @Query(() => [RecommendedOrderDiagnosisCode], { nullable: true })
  userSelectRecommendedOrderDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRecommendedOrderDiagnosisCodeInput, nullable: true }) input?: UserListRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.userSelectRecommendedOrderDiagnosisCodes(user.id, input)
  }







  @Query(() => RecommendedOrderDiagnosisCode, { nullable: true })
  userRecommendedOrderDiagnosisCode(@CtxUser() user: User, @Args('recommendedOrderDiagnosisCodeId') recommendedOrderDiagnosisCodeId: string) {
    return this.service.userRecommendedOrderDiagnosisCode(user.id, recommendedOrderDiagnosisCodeId)
  }

  @Mutation(() => RecommendedOrderDiagnosisCode, { nullable: true })
  userCreateRecommendedOrderDiagnosisCode(@CtxUser() user: User, @Args('input') input: UserCreateRecommendedOrderDiagnosisCodeInput,) {
    return this.service.userCreateRecommendedOrderDiagnosisCode(user.id, input)
  }

  @Mutation(() => RecommendedOrderDiagnosisCode, { nullable: true })
  userUpdateRecommendedOrderDiagnosisCode(
    @CtxUser() user: User,
    @Args('recommendedOrderDiagnosisCodeId') recommendedOrderDiagnosisCodeId: string,
    @Args('input') input: UserUpdateRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.userUpdateRecommendedOrderDiagnosisCode(user.id, recommendedOrderDiagnosisCodeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateRecommendedOrderDiagnosisCodes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateRecommendedOrderDiagnosisCodesInput,
  ) {
    return this.service.userUpdateRecommendedOrderDiagnosisCodes(user.id, input)
  }

  @Mutation(() => RecommendedOrderDiagnosisCode, { nullable: true })
  userDeleteRecommendedOrderDiagnosisCode(@CtxUser() user: User, @Args('recommendedOrderDiagnosisCodeId') recommendedOrderDiagnosisCodeId: string) {
    return this.service.userDeleteRecommendedOrderDiagnosisCode(user.id, recommendedOrderDiagnosisCodeId)
  }
}

