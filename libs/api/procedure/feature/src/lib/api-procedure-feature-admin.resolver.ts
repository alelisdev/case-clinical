
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureInput,
  AdminListProcedureInput,
  AdminUpdateProcedureInput,
  ApiProcedureDataAccessAdminService,
  Procedure
} from '@case-clinical/api/procedure/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureDataAccessAdminService) {}

  @Query(() => [Procedure], { nullable: true })
  adminProcedures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureInput, nullable: true }) input?: AdminListProcedureInput,
  ) {
    return this.service.adminProcedures(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureInput, nullable: true }) input?: AdminListProcedureInput,
  ) {
    return this.service.adminCountProcedures(admin.id, input)
  }





  @Query(() => Procedure, { nullable: true })
  adminProcedure(@CtxUser() admin: User, @Args('procedureId') procedureId: string) {
    return this.service.adminProcedure(admin.id, procedureId)
  }

  @Mutation(() => Procedure, { nullable: true })
  adminCreateProcedure(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureInput,) {
    return this.service.adminCreateProcedure(admin.id, input)
  }

  @Mutation(() => Procedure, { nullable: true })
  adminUpdateProcedure(
    @CtxUser() admin: User,
    @Args('procedureId') procedureId: string,
    @Args('input') input: AdminUpdateProcedureInput,
  ) {
    return this.service.adminUpdateProcedure(admin.id, procedureId, input)
  }

  @Mutation(() => Procedure, { nullable: true })
  adminDeleteProcedure(@CtxUser() admin: User, @Args('procedureId') procedureId: string) {
    return this.service.adminDeleteProcedure(admin.id, procedureId)
  }
}

