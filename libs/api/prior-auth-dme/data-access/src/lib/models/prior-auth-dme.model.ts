import { Field, ObjectType } from '@nestjs/graphql'

import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'

import { DurableMedicalEquipment } from '@case-clinical/api/durable-medical-equipment/data-access'


@ObjectType()
export class PriorAuthDme {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  priorAuthId?: string

  @Field({ nullable: true }) 
  durableMedicalEquipmentId?: string


  @Field(() => PriorAuthorizationRequest, { nullable: true }) 
  priorAuthorizationRequest?: PriorAuthorizationRequest  

  @Field(() => DurableMedicalEquipment, { nullable: true }) 
  durableMedicalEquipment?: DurableMedicalEquipment  

}
