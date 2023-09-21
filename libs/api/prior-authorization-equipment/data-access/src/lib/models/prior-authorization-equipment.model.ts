import { Field, ObjectType } from '@nestjs/graphql'

import { Equipment } from '@case-clinical/api/equipment/data-access'

import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'


@ObjectType()
export class PriorAuthorizationEquipment {

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
  equipmentId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string


  @Field(() => Equipment, { nullable: true }) 
  equipment?: Equipment  

  @Field(() => PriorAuthorizationRequest, { nullable: true }) 
  priorAuthorizationRequest?: PriorAuthorizationRequest  

}
