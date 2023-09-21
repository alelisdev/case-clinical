
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureTypeInput,
  AdminListProcedureTypeInput,
  AdminUpdateProcedureTypeInput,
  ApiProcedureTypeDataAccessAdminService,
  ProcedureType
} from '@case-clinical/api/procedure-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureTypeFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureTypeDataAccessAdminService) {}

  @Query(() => [ProcedureType], { nullable: true })
  adminProcedureTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureTypeInput, nullable: true }) input?: AdminListProcedureTypeInput,
  ) {
    return this.service.adminProcedureTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedureTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureTypeInput, nullable: true }) input?: AdminListProcedureTypeInput,
  ) {
    return this.service.adminCountProcedureTypes(admin.id, input)
  }





  @Query(() => ProcedureType, { nullable: true })
  adminProcedureType(@CtxUser() admin: User, @Args('procedureTypeId') procedureTypeId: string) {
    return this.service.adminProcedureType(admin.id, procedureTypeId)
  }

  @Mutation(() => ProcedureType, { nullable: true })
  adminCreateProcedureType(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureTypeInput,) {
    return this.service.adminCreateProcedureType(admin.id, input)
  }

  @Mutation(() => ProcedureType, { nullable: true })
  adminUpdateProcedureType(
    @CtxUser() admin: User,
    @Args('procedureTypeId') procedureTypeId: string,
    @Args('input') input: AdminUpdateProcedureTypeInput,
  ) {
    return this.service.adminUpdateProcedureType(admin.id, procedureTypeId, input)
  }

  @Mutation(() => ProcedureType, { nullable: true })
  adminDeleteProcedureType(@CtxUser() admin: User, @Args('procedureTypeId') procedureTypeId: string) {
    return this.service.adminDeleteProcedureType(admin.id, procedureTypeId)
  }
}

