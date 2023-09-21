
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureVendorInput,
  UserListProcedureVendorInput,
  UserUpdateProcedureVendorInput,
  UserUpdateProcedureVendorsInput,
  ApiProcedureVendorDataAccessUserService,
  ProcedureVendor,
} from '@case-clinical/api/procedure-vendor/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListCaseProcedureInput, CaseProcedure } from '@case-clinical/api/case-procedure/data-access'
import { UserListContractInput, Contract } from '@case-clinical/api/contract/data-access'
import { UserListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'
import { UserListProcedureVendorStatusInput, ProcedureVendorStatus } from '@case-clinical/api/procedure-vendor-status/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureVendorFeatureUserResolver {
  constructor(private readonly service: ApiProcedureVendorDataAccessUserService) {}

  @Query(() => [ProcedureVendor], { nullable: true })
  userProcedureVendors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureVendorInput, nullable: true }) input?: UserListProcedureVendorInput,
  ) {
    return this.service.userProcedureVendors(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedureVendors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureVendorInput, nullable: true }) input?: UserListProcedureVendorInput,
  ) {
    return this.service.userCountProcedureVendors(user.id, input)
  }

  @Query(() => [ProcedureVendor], { nullable: true })
  userSelectProcedureVendors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureVendorInput, nullable: true }) input?: UserListProcedureVendorInput,
  ) {
    return this.service.userSelectProcedureVendors(user.id, input)
  }







  @Query(() => ProcedureVendor, { nullable: true })
  userProcedureVendor(@CtxUser() user: User, @Args('procedureVendorId') procedureVendorId: string) {
    return this.service.userProcedureVendor(user.id, procedureVendorId)
  }

  @Mutation(() => ProcedureVendor, { nullable: true })
  userCreateProcedureVendor(@CtxUser() user: User, @Args('input') input: UserCreateProcedureVendorInput,) {
    return this.service.userCreateProcedureVendor(user.id, input)
  }

  @Mutation(() => ProcedureVendor, { nullable: true })
  userUpdateProcedureVendor(
    @CtxUser() user: User,
    @Args('procedureVendorId') procedureVendorId: string,
    @Args('input') input: UserUpdateProcedureVendorInput,
  ) {
    return this.service.userUpdateProcedureVendor(user.id, procedureVendorId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedureVendors(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcedureVendorsInput,
  ) {
    return this.service.userUpdateProcedureVendors(user.id, input)
  }

  @Mutation(() => ProcedureVendor, { nullable: true })
  userDeleteProcedureVendor(@CtxUser() user: User, @Args('procedureVendorId') procedureVendorId: string) {
    return this.service.userDeleteProcedureVendor(user.id, procedureVendorId)
  }
}

