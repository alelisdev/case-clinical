
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorAuthorizationEquipmentInput,
  AdminListPriorAuthorizationEquipmentInput,
  AdminUpdatePriorAuthorizationEquipmentInput,
  ApiPriorAuthorizationEquipmentDataAccessAdminService,
  PriorAuthorizationEquipment
} from '@case-clinical/api/prior-authorization-equipment/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListEquipmentInput, Equipment } from '@case-clinical/api/equipment/data-access'
import { AdminListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorAuthorizationEquipmentFeatureAdminResolver {
  constructor(private readonly service: ApiPriorAuthorizationEquipmentDataAccessAdminService) {}

  @Query(() => [PriorAuthorizationEquipment], { nullable: true })
  adminPriorAuthorizationEquipments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationEquipmentInput, nullable: true }) input?: AdminListPriorAuthorizationEquipmentInput,
  ) {
    return this.service.adminPriorAuthorizationEquipments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorAuthorizationEquipments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationEquipmentInput, nullable: true }) input?: AdminListPriorAuthorizationEquipmentInput,
  ) {
    return this.service.adminCountPriorAuthorizationEquipments(admin.id, input)
  }





  @Query(() => PriorAuthorizationEquipment, { nullable: true })
  adminPriorAuthorizationEquipment(@CtxUser() admin: User, @Args('priorAuthorizationEquipmentId') priorAuthorizationEquipmentId: string) {
    return this.service.adminPriorAuthorizationEquipment(admin.id, priorAuthorizationEquipmentId)
  }

  @Mutation(() => PriorAuthorizationEquipment, { nullable: true })
  adminCreatePriorAuthorizationEquipment(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorAuthorizationEquipmentInput,) {
    return this.service.adminCreatePriorAuthorizationEquipment(admin.id, input)
  }

  @Mutation(() => PriorAuthorizationEquipment, { nullable: true })
  adminUpdatePriorAuthorizationEquipment(
    @CtxUser() admin: User,
    @Args('priorAuthorizationEquipmentId') priorAuthorizationEquipmentId: string,
    @Args('input') input: AdminUpdatePriorAuthorizationEquipmentInput,
  ) {
    return this.service.adminUpdatePriorAuthorizationEquipment(admin.id, priorAuthorizationEquipmentId, input)
  }

  @Mutation(() => PriorAuthorizationEquipment, { nullable: true })
  adminDeletePriorAuthorizationEquipment(@CtxUser() admin: User, @Args('priorAuthorizationEquipmentId') priorAuthorizationEquipmentId: string) {
    return this.service.adminDeletePriorAuthorizationEquipment(admin.id, priorAuthorizationEquipmentId)
  }
}

