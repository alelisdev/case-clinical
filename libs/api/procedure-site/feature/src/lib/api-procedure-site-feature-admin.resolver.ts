
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureSiteInput,
  AdminListProcedureSiteInput,
  AdminUpdateProcedureSiteInput,
  ApiProcedureSiteDataAccessAdminService,
  ProcedureSite
} from '@case-clinical/api/procedure-site/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureSiteFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureSiteDataAccessAdminService) {}

  @Query(() => [ProcedureSite], { nullable: true })
  adminProcedureSites(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureSiteInput, nullable: true }) input?: AdminListProcedureSiteInput,
  ) {
    return this.service.adminProcedureSites(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedureSites(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureSiteInput, nullable: true }) input?: AdminListProcedureSiteInput,
  ) {
    return this.service.adminCountProcedureSites(admin.id, input)
  }





  @Query(() => ProcedureSite, { nullable: true })
  adminProcedureSite(@CtxUser() admin: User, @Args('procedureSiteId') procedureSiteId: string) {
    return this.service.adminProcedureSite(admin.id, procedureSiteId)
  }

  @Mutation(() => ProcedureSite, { nullable: true })
  adminCreateProcedureSite(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureSiteInput,) {
    return this.service.adminCreateProcedureSite(admin.id, input)
  }

  @Mutation(() => ProcedureSite, { nullable: true })
  adminUpdateProcedureSite(
    @CtxUser() admin: User,
    @Args('procedureSiteId') procedureSiteId: string,
    @Args('input') input: AdminUpdateProcedureSiteInput,
  ) {
    return this.service.adminUpdateProcedureSite(admin.id, procedureSiteId, input)
  }

  @Mutation(() => ProcedureSite, { nullable: true })
  adminDeleteProcedureSite(@CtxUser() admin: User, @Args('procedureSiteId') procedureSiteId: string) {
    return this.service.adminDeleteProcedureSite(admin.id, procedureSiteId)
  }
}

