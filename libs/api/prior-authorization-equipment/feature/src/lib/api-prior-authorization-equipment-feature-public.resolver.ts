
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorAuthorizationEquipmentInput,
  ApiPriorAuthorizationEquipmentDataAccessPublicService,
  PriorAuthorizationEquipment,
} from '@case-clinical/api/prior-authorization-equipment/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorAuthorizationEquipmentFeaturePublicResolver {
  constructor(private readonly service: ApiPriorAuthorizationEquipmentDataAccessPublicService) {}
           
  @Query(() => [PriorAuthorizationEquipment], { nullable: true })
  publicPriorAuthorizationEquipments(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationEquipmentInput, nullable: true }) input?: UserListPriorAuthorizationEquipmentInput,
  ) {
    return this.service.publicPriorAuthorizationEquipments(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorAuthorizationEquipments(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationEquipmentInput, nullable: true }) input?: UserListPriorAuthorizationEquipmentInput,
  ) {
    return this.service.publicCountPriorAuthorizationEquipments(input)
  }

  @Query(() => [PriorAuthorizationEquipment], { nullable: true })
  publicSelectPriorAuthorizationEquipments(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationEquipmentInput, nullable: true }) input?: UserListPriorAuthorizationEquipmentInput,
  ) {
    return this.service.publicSelectPriorAuthorizationEquipments(input)
  }

  @Query(() => PriorAuthorizationEquipment, { nullable: true })
  publicPriorAuthorizationEquipment(@Args('priorAuthorizationEquipmentId') priorAuthorizationEquipmentId: string) {
    return this.service.publicPriorAuthorizationEquipment(priorAuthorizationEquipmentId)
  }
}
