
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorAuthorizationImplantInput,
  AdminListPriorAuthorizationImplantInput,
  AdminUpdatePriorAuthorizationImplantInput,
  ApiPriorAuthorizationImplantDataAccessAdminService,
  PriorAuthorizationImplant
} from '@case-clinical/api/prior-authorization-implant/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListImplantInput, Implant } from '@case-clinical/api/implant/data-access'
import { AdminListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorAuthorizationImplantFeatureAdminResolver {
  constructor(private readonly service: ApiPriorAuthorizationImplantDataAccessAdminService) {}

  @Query(() => [PriorAuthorizationImplant], { nullable: true })
  adminPriorAuthorizationImplants(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationImplantInput, nullable: true }) input?: AdminListPriorAuthorizationImplantInput,
  ) {
    return this.service.adminPriorAuthorizationImplants(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorAuthorizationImplants(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationImplantInput, nullable: true }) input?: AdminListPriorAuthorizationImplantInput,
  ) {
    return this.service.adminCountPriorAuthorizationImplants(admin.id, input)
  }





  @Query(() => PriorAuthorizationImplant, { nullable: true })
  adminPriorAuthorizationImplant(@CtxUser() admin: User, @Args('priorAuthorizationImplantId') priorAuthorizationImplantId: string) {
    return this.service.adminPriorAuthorizationImplant(admin.id, priorAuthorizationImplantId)
  }

  @Mutation(() => PriorAuthorizationImplant, { nullable: true })
  adminCreatePriorAuthorizationImplant(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorAuthorizationImplantInput,) {
    return this.service.adminCreatePriorAuthorizationImplant(admin.id, input)
  }

  @Mutation(() => PriorAuthorizationImplant, { nullable: true })
  adminUpdatePriorAuthorizationImplant(
    @CtxUser() admin: User,
    @Args('priorAuthorizationImplantId') priorAuthorizationImplantId: string,
    @Args('input') input: AdminUpdatePriorAuthorizationImplantInput,
  ) {
    return this.service.adminUpdatePriorAuthorizationImplant(admin.id, priorAuthorizationImplantId, input)
  }

  @Mutation(() => PriorAuthorizationImplant, { nullable: true })
  adminDeletePriorAuthorizationImplant(@CtxUser() admin: User, @Args('priorAuthorizationImplantId') priorAuthorizationImplantId: string) {
    return this.service.adminDeletePriorAuthorizationImplant(admin.id, priorAuthorizationImplantId)
  }
}

