import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class DurableMedicalEquipmentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  itemCode?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  size?: string

  @Field({ nullable: true }) 
  brand?: string

  @Field({ nullable: true }) 
  itemURL?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

}
