
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorAuthDmeInput,
  AdminListPriorAuthDmeInput,
  AdminUpdatePriorAuthDmeInput,
  ApiPriorAuthDmeDataAccessAdminService,
  PriorAuthDme
} from '@case-clinical/api/prior-auth-dme/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminListDurableMedicalEquipmentInput, DurableMedicalEquipment } from '@case-clinical/api/durable-medical-equipment/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorAuthDmeFeatureAdminResolver {
  constructor(private readonly service: ApiPriorAuthDmeDataAccessAdminService) {}

  @Query(() => [PriorAuthDme], { nullable: true })
  adminPriorAuthDmes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthDmeInput, nullable: true }) input?: AdminListPriorAuthDmeInput,
  ) {
    return this.service.adminPriorAuthDmes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorAuthDmes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthDmeInput, nullable: true }) input?: AdminListPriorAuthDmeInput,
  ) {
    return this.service.adminCountPriorAuthDmes(admin.id, input)
  }





  @Query(() => PriorAuthDme, { nullable: true })
  adminPriorAuthDme(@CtxUser() admin: User, @Args('priorAuthDmeId') priorAuthDmeId: string) {
    return this.service.adminPriorAuthDme(admin.id, priorAuthDmeId)
  }

  @Mutation(() => PriorAuthDme, { nullable: true })
  adminCreatePriorAuthDme(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorAuthDmeInput,) {
    return this.service.adminCreatePriorAuthDme(admin.id, input)
  }

  @Mutation(() => PriorAuthDme, { nullable: true })
  adminUpdatePriorAuthDme(
    @CtxUser() admin: User,
    @Args('priorAuthDmeId') priorAuthDmeId: string,
    @Args('input') input: AdminUpdatePriorAuthDmeInput,
  ) {
    return this.service.adminUpdatePriorAuthDme(admin.id, priorAuthDmeId, input)
  }

  @Mutation(() => PriorAuthDme, { nullable: true })
  adminDeletePriorAuthDme(@CtxUser() admin: User, @Args('priorAuthDmeId') priorAuthDmeId: string) {
    return this.service.adminDeletePriorAuthDme(admin.id, priorAuthDmeId)
  }
}

