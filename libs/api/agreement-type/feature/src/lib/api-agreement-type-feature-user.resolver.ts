
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAgreementTypeInput,
  UserListAgreementTypeInput,
  UserUpdateAgreementTypeInput,
  UserUpdateAgreementTypesInput,
  ApiAgreementTypeDataAccessUserService,
  AgreementType,
} from '@case-clinical/api/agreement-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAgreementTypeFeatureUserResolver {
  constructor(private readonly service: ApiAgreementTypeDataAccessUserService) {}

  @Query(() => [AgreementType], { nullable: true })
  userAgreementTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAgreementTypeInput, nullable: true }) input?: UserListAgreementTypeInput,
  ) {
    return this.service.userAgreementTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAgreementTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAgreementTypeInput, nullable: true }) input?: UserListAgreementTypeInput,
  ) {
    return this.service.userCountAgreementTypes(user.id, input)
  }

  @Query(() => [AgreementType], { nullable: true })
  userSelectAgreementTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAgreementTypeInput, nullable: true }) input?: UserListAgreementTypeInput,
  ) {
    return this.service.userSelectAgreementTypes(user.id, input)
  }







  @Query(() => AgreementType, { nullable: true })
  userAgreementType(@CtxUser() user: User, @Args('agreementTypeId') agreementTypeId: string) {
    return this.service.userAgreementType(user.id, agreementTypeId)
  }

  @Mutation(() => AgreementType, { nullable: true })
  userCreateAgreementType(@CtxUser() user: User, @Args('input') input: UserCreateAgreementTypeInput,) {
    return this.service.userCreateAgreementType(user.id, input)
  }

  @Mutation(() => AgreementType, { nullable: true })
  userUpdateAgreementType(
    @CtxUser() user: User,
    @Args('agreementTypeId') agreementTypeId: string,
    @Args('input') input: UserUpdateAgreementTypeInput,
  ) {
    return this.service.userUpdateAgreementType(user.id, agreementTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAgreementTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAgreementTypesInput,
  ) {
    return this.service.userUpdateAgreementTypes(user.id, input)
  }

  @Mutation(() => AgreementType, { nullable: true })
  userDeleteAgreementType(@CtxUser() user: User, @Args('agreementTypeId') agreementTypeId: string) {
    return this.service.userDeleteAgreementType(user.id, agreementTypeId)
  }
}

