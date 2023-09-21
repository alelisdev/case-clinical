
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCaseProcedureInput,
  UserListCaseProcedureInput,
  UserUpdateCaseProcedureInput,
  UserUpdateCaseProceduresInput,
  ApiCaseProcedureDataAccessUserService,
  CaseProcedure,
} from '@case-clinical/api/case-procedure/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { UserListAppointmentInput, Appointment } from '@case-clinical/api/appointment/data-access'
import { UserListLocationInput, Location } from '@case-clinical/api/location/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCaseProcedureFeatureUserResolver {
  constructor(private readonly service: ApiCaseProcedureDataAccessUserService) {}

  @Query(() => [CaseProcedure], { nullable: true })
  userCaseProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseProcedureInput, nullable: true }) input?: UserListCaseProcedureInput,
  ) {
    return this.service.userCaseProcedures(user.id, input)
  }

  @Query(() => [CaseProcedure], { nullable: true })
  userSelectDetailCaseProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseProcedureInput, nullable: true }) input?: UserListCaseProcedureInput,
  ) {
    return this.service.userSelectDetailCaseProcedures(user.id, input)
  }
  
  @Query(() => CorePaging, { nullable: true })
  userCountCaseProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseProcedureInput, nullable: true }) input?: UserListCaseProcedureInput,
  ) {
    return this.service.userCountCaseProcedures(user.id, input)
  }

  @Query(() => [CaseProcedure], { nullable: true })
  userSelectCaseProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseProcedureInput, nullable: true }) input?: UserListCaseProcedureInput,
  ) {
    return this.service.userSelectCaseProcedures(user.id, input)
  }







  @Query(() => CaseProcedure, { nullable: true })
  userCaseProcedure(@CtxUser() user: User, @Args('caseProcedureId') caseProcedureId: string) {
    return this.service.userCaseProcedure(user.id, caseProcedureId)
  }

  @Mutation(() => CaseProcedure, { nullable: true })
  userCreateCaseProcedure(@CtxUser() user: User, @Args('input') input: UserCreateCaseProcedureInput,) {
    return this.service.userCreateCaseProcedure(user.id, input)
  }

  @Mutation(() => CaseProcedure, { nullable: true })
  userUpdateCaseProcedure(
    @CtxUser() user: User,
    @Args('caseProcedureId') caseProcedureId: string,
    @Args('input') input: UserUpdateCaseProcedureInput,
  ) {
    return this.service.userUpdateCaseProcedure(user.id, caseProcedureId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCaseProcedures(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCaseProceduresInput,
  ) {
    return this.service.userUpdateCaseProcedures(user.id, input)
  }

  @Mutation(() => CaseProcedure, { nullable: true })
  userDeleteCaseProcedure(@CtxUser() user: User, @Args('caseProcedureId') caseProcedureId: string) {
    return this.service.userDeleteCaseProcedure(user.id, caseProcedureId)
  }
}

