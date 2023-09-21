
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureInput,
  UserListProcedureInput,
  UserUpdateProcedureInput,
  UserUpdateProceduresInput,
  ApiProcedureDataAccessUserService,
  Procedure,
} from '@case-clinical/api/procedure/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureFeatureUserResolver {
  constructor(private readonly service: ApiProcedureDataAccessUserService) {}

  @Query(() => [Procedure], { nullable: true })
  userProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureInput, nullable: true }) input?: UserListProcedureInput,
  ) {
    return this.service.userProcedures(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureInput, nullable: true }) input?: UserListProcedureInput,
  ) {
    return this.service.userCountProcedures(user.id, input)
  }

  @Query(() => [Procedure], { nullable: true })
  userSelectProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureInput, nullable: true }) input?: UserListProcedureInput,
  ) {
    return this.service.userSelectProcedures(user.id, input)
  }







  @Query(() => Procedure, { nullable: true })
  userProcedure(@CtxUser() user: User, @Args('procedureId') procedureId: string) {
    return this.service.userProcedure(user.id, procedureId)
  }

  @Mutation(() => Procedure, { nullable: true })
  userCreateProcedure(@CtxUser() user: User, @Args('input') input: UserCreateProcedureInput,) {
    return this.service.userCreateProcedure(user.id, input)
  }

  @Mutation(() => Procedure, { nullable: true })
  userUpdateProcedure(
    @CtxUser() user: User,
    @Args('procedureId') procedureId: string,
    @Args('input') input: UserUpdateProcedureInput,
  ) {
    return this.service.userUpdateProcedure(user.id, procedureId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedures(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProceduresInput,
  ) {
    return this.service.userUpdateProcedures(user.id, input)
  }

  @Mutation(() => Procedure, { nullable: true })
  userDeleteProcedure(@CtxUser() user: User, @Args('procedureId') procedureId: string) {
    return this.service.userDeleteProcedure(user.id, procedureId)
  }
}

