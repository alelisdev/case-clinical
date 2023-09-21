
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListDurableMedicalEquipmentInput,
  ApiDurableMedicalEquipmentDataAccessPublicService,
  DurableMedicalEquipment,
} from '@case-clinical/api/durable-medical-equipment/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiDurableMedicalEquipmentFeaturePublicResolver {
  constructor(private readonly service: ApiDurableMedicalEquipmentDataAccessPublicService) {}
           
  @Query(() => [DurableMedicalEquipment], { nullable: true })
  publicDurableMedicalEquipments(
    @Args({ name: 'input', type: () => UserListDurableMedicalEquipmentInput, nullable: true }) input?: UserListDurableMedicalEquipmentInput,
  ) {
    return this.service.publicDurableMedicalEquipments(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountDurableMedicalEquipments(
    @Args({ name: 'input', type: () => UserListDurableMedicalEquipmentInput, nullable: true }) input?: UserListDurableMedicalEquipmentInput,
  ) {
    return this.service.publicCountDurableMedicalEquipments(input)
  }

  @Query(() => [DurableMedicalEquipment], { nullable: true })
  publicSelectDurableMedicalEquipments(
    @Args({ name: 'input', type: () => UserListDurableMedicalEquipmentInput, nullable: true }) input?: UserListDurableMedicalEquipmentInput,
  ) {
    return this.service.publicSelectDurableMedicalEquipments(input)
  }

  @Query(() => DurableMedicalEquipment, { nullable: true })
  publicDurableMedicalEquipment(@Args('durableMedicalEquipmentId') durableMedicalEquipmentId: string) {
    return this.service.publicDurableMedicalEquipment(durableMedicalEquipmentId)
  }
}
