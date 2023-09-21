
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureTypeInput,
  UserListProcedureTypeInput,
  UserUpdateProcedureTypeInput,
  UserUpdateProcedureTypesInput,
  ApiProcedureTypeDataAccessUserService,
  ProcedureType,
} from '@case-clinical/api/procedure-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureTypeFeatureUserResolver {
  constructor(private readonly service: ApiProcedureTypeDataAccessUserService) {}

  @Query(() => [ProcedureType], { nullable: true })
  userProcedureTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureTypeInput, nullable: true }) input?: UserListProcedureTypeInput,
  ) {
    return this.service.userProcedureTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedureTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureTypeInput, nullable: true }) input?: UserListProcedureTypeInput,
  ) {
    return this.service.userCountProcedureTypes(user.id, input)
  }

  @Query(() => [ProcedureType], { nullable: true })
  userSelectProcedureTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureTypeInput, nullable: true }) input?: UserListProcedureTypeInput,
  ) {
    return this.service.userSelectProcedureTypes(user.id, input)
  }







  @Query(() => ProcedureType, { nullable: true })
  userProcedureType(@CtxUser() user: User, @Args('procedureTypeId') procedureTypeId: string) {
    return this.service.userProcedureType(user.id, procedureTypeId)
  }

  @Mutation(() => ProcedureType, { nullable: true })
  userCreateProcedureType(@CtxUser() user: User, @Args('input') input: UserCreateProcedureTypeInput,) {
    return this.service.userCreateProcedureType(user.id, input)
  }

  @Mutation(() => ProcedureType, { nullable: true })
  userUpdateProcedureType(
    @CtxUser() user: User,
    @Args('procedureTypeId') procedureTypeId: string,
    @Args('input') input: UserUpdateProcedureTypeInput,
  ) {
    return this.service.userUpdateProcedureType(user.id, procedureTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedureTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcedureTypesInput,
  ) {
    return this.service.userUpdateProcedureTypes(user.id, input)
  }

  @Mutation(() => ProcedureType, { nullable: true })
  userDeleteProcedureType(@CtxUser() user: User, @Args('procedureTypeId') procedureTypeId: string) {
    return this.service.userDeleteProcedureType(user.id, procedureTypeId)
  }
}

