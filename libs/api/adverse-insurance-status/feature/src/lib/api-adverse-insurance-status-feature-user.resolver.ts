
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAdverseInsuranceStatusInput,
  UserListAdverseInsuranceStatusInput,
  UserUpdateAdverseInsuranceStatusInput,
  UserUpdateAdverseInsuranceStatusesInput,
  ApiAdverseInsuranceStatusDataAccessUserService,
  AdverseInsuranceStatus,
} from '@case-clinical/api/adverse-insurance-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAdverseInsuranceStatusFeatureUserResolver {
  constructor(private readonly service: ApiAdverseInsuranceStatusDataAccessUserService) {}

  @Query(() => [AdverseInsuranceStatus], { nullable: true })
  userAdverseInsuranceStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAdverseInsuranceStatusInput, nullable: true }) input?: UserListAdverseInsuranceStatusInput,
  ) {
    return this.service.userAdverseInsuranceStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAdverseInsuranceStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAdverseInsuranceStatusInput, nullable: true }) input?: UserListAdverseInsuranceStatusInput,
  ) {
    return this.service.userCountAdverseInsuranceStatuses(user.id, input)
  }

  @Query(() => [AdverseInsuranceStatus], { nullable: true })
  userSelectAdverseInsuranceStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAdverseInsuranceStatusInput, nullable: true }) input?: UserListAdverseInsuranceStatusInput,
  ) {
    return this.service.userSelectAdverseInsuranceStatuses(user.id, input)
  }







  @Query(() => AdverseInsuranceStatus, { nullable: true })
  userAdverseInsuranceStatus(@CtxUser() user: User, @Args('adverseInsuranceStatusId') adverseInsuranceStatusId: string) {
    return this.service.userAdverseInsuranceStatus(user.id, adverseInsuranceStatusId)
  }

  @Mutation(() => AdverseInsuranceStatus, { nullable: true })
  userCreateAdverseInsuranceStatus(@CtxUser() user: User, @Args('input') input: UserCreateAdverseInsuranceStatusInput,) {
    return this.service.userCreateAdverseInsuranceStatus(user.id, input)
  }

  @Mutation(() => AdverseInsuranceStatus, { nullable: true })
  userUpdateAdverseInsuranceStatus(
    @CtxUser() user: User,
    @Args('adverseInsuranceStatusId') adverseInsuranceStatusId: string,
    @Args('input') input: UserUpdateAdverseInsuranceStatusInput,
  ) {
    return this.service.userUpdateAdverseInsuranceStatus(user.id, adverseInsuranceStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAdverseInsuranceStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAdverseInsuranceStatusesInput,
  ) {
    return this.service.userUpdateAdverseInsuranceStatuses(user.id, input)
  }

  @Mutation(() => AdverseInsuranceStatus, { nullable: true })
  userDeleteAdverseInsuranceStatus(@CtxUser() user: User, @Args('adverseInsuranceStatusId') adverseInsuranceStatusId: string) {
    return this.service.userDeleteAdverseInsuranceStatus(user.id, adverseInsuranceStatusId)
  }
}

