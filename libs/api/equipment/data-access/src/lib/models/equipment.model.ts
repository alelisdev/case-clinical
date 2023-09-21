import { Field, ObjectType } from '@nestjs/graphql'

import { PriorAuthorizationEquipment } from '@case-clinical/api/prior-authorization-equipment/data-access' 


@ObjectType()
export class Equipment {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [PriorAuthorizationEquipment], { nullable: true }) 
  priorAuthorizationEquipments?: PriorAuthorizationEquipment[]


}
