
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListEquipmentInput,
  ApiEquipmentDataAccessPublicService,
  Equipment,
} from '@case-clinical/api/equipment/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiEquipmentFeaturePublicResolver {
  constructor(private readonly service: ApiEquipmentDataAccessPublicService) {}
           
  @Query(() => [Equipment], { nullable: true })
  publicEquipments(
    @Args({ name: 'input', type: () => UserListEquipmentInput, nullable: true }) input?: UserListEquipmentInput,
  ) {
    return this.service.publicEquipments(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountEquipments(
    @Args({ name: 'input', type: () => UserListEquipmentInput, nullable: true }) input?: UserListEquipmentInput,
  ) {
    return this.service.publicCountEquipments(input)
  }

  @Query(() => [Equipment], { nullable: true })
  publicSelectEquipments(
    @Args({ name: 'input', type: () => UserListEquipmentInput, nullable: true }) input?: UserListEquipmentInput,
  ) {
    return this.service.publicSelectEquipments(input)
  }

  @Query(() => Equipment, { nullable: true })
  publicEquipment(@Args('equipmentId') equipmentId: string) {
    return this.service.publicEquipment(equipmentId)
  }
}
