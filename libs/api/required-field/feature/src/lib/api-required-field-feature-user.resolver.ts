
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateRequiredFieldInput,
  UserListRequiredFieldInput,
  UserUpdateRequiredFieldInput,
  UserUpdateRequiredFieldsInput,
  ApiRequiredFieldDataAccessUserService,
  RequiredField,
} from '@case-clinical/api/required-field/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListAccidentTypeInput, AccidentType } from '@case-clinical/api/accident-type/data-access'
import { UserListMedLevelInput, MedLevel } from '@case-clinical/api/med-level/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiRequiredFieldFeatureUserResolver {
  constructor(private readonly service: ApiRequiredFieldDataAccessUserService) {}

  @Query(() => [RequiredField], { nullable: true })
  userRequiredFields(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRequiredFieldInput, nullable: true }) input?: UserListRequiredFieldInput,
  ) {
    return this.service.userRequiredFields(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountRequiredFields(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRequiredFieldInput, nullable: true }) input?: UserListRequiredFieldInput,
  ) {
    return this.service.userCountRequiredFields(user.id, input)
  }

  @Query(() => [RequiredField], { nullable: true })
  userSelectRequiredFields(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRequiredFieldInput, nullable: true }) input?: UserListRequiredFieldInput,
  ) {
    return this.service.userSelectRequiredFields(user.id, input)
  }







  @Query(() => RequiredField, { nullable: true })
  userRequiredField(@CtxUser() user: User, @Args('requiredFieldId') requiredFieldId: string) {
    return this.service.userRequiredField(user.id, requiredFieldId)
  }

  @Mutation(() => RequiredField, { nullable: true })
  userCreateRequiredField(@CtxUser() user: User, @Args('input') input: UserCreateRequiredFieldInput,) {
    return this.service.userCreateRequiredField(user.id, input)
  }

  @Mutation(() => RequiredField, { nullable: true })
  userUpdateRequiredField(
    @CtxUser() user: User,
    @Args('requiredFieldId') requiredFieldId: string,
    @Args('input') input: UserUpdateRequiredFieldInput,
  ) {
    return this.service.userUpdateRequiredField(user.id, requiredFieldId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateRequiredFields(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateRequiredFieldsInput,
  ) {
    return this.service.userUpdateRequiredFields(user.id, input)
  }

  @Mutation(() => RequiredField, { nullable: true })
  userDeleteRequiredField(@CtxUser() user: User, @Args('requiredFieldId') requiredFieldId: string) {
    return this.service.userDeleteRequiredField(user.id, requiredFieldId)
  }
}

