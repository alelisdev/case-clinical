
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCaseProcedureInput,
  AdminListCaseProcedureInput,
  AdminUpdateCaseProcedureInput,
  ApiCaseProcedureDataAccessAdminService,
  CaseProcedure
} from '@case-clinical/api/case-procedure/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { AdminListAppointmentInput, Appointment } from '@case-clinical/api/appointment/data-access'
import { AdminListLocationInput, Location } from '@case-clinical/api/location/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCaseProcedureFeatureAdminResolver {
  constructor(private readonly service: ApiCaseProcedureDataAccessAdminService) {}

  @Query(() => [CaseProcedure], { nullable: true })
  adminCaseProcedures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseProcedureInput, nullable: true }) input?: AdminListCaseProcedureInput,
  ) {
    return this.service.adminCaseProcedures(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCaseProcedures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseProcedureInput, nullable: true }) input?: AdminListCaseProcedureInput,
  ) {
    return this.service.adminCountCaseProcedures(admin.id, input)
  }





  @Query(() => CaseProcedure, { nullable: true })
  adminCaseProcedure(@CtxUser() admin: User, @Args('caseProcedureId') caseProcedureId: string) {
    return this.service.adminCaseProcedure(admin.id, caseProcedureId)
  }

  @Mutation(() => CaseProcedure, { nullable: true })
  adminCreateCaseProcedure(@CtxUser() admin: User, @Args('input') input: AdminCreateCaseProcedureInput,) {
    return this.service.adminCreateCaseProcedure(admin.id, input)
  }

  @Mutation(() => CaseProcedure, { nullable: true })
  adminUpdateCaseProcedure(
    @CtxUser() admin: User,
    @Args('caseProcedureId') caseProcedureId: string,
    @Args('input') input: AdminUpdateCaseProcedureInput,
  ) {
    return this.service.adminUpdateCaseProcedure(admin.id, caseProcedureId, input)
  }

  @Mutation(() => CaseProcedure, { nullable: true })
  adminDeleteCaseProcedure(@CtxUser() admin: User, @Args('caseProcedureId') caseProcedureId: string) {
    return this.service.adminDeleteCaseProcedure(admin.id, caseProcedureId)
  }
}

