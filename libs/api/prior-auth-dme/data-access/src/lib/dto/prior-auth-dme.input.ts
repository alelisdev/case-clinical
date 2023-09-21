import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PriorAuthDmeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  priorAuthId?: string

  @Field({ nullable: true }) 
  durableMedicalEquipmentId?: string
}
