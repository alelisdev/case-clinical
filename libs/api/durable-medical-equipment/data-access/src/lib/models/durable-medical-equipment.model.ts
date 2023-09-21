import { Field, ObjectType } from '@nestjs/graphql'

import { Vendor } from '@case-clinical/api/vendor/data-access'
import { PriorAuthDme } from '@case-clinical/api/prior-auth-dme/data-access' 


@ObjectType()
export class DurableMedicalEquipment {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [PriorAuthDme], { nullable: true }) 
  priorAuthDmes?: PriorAuthDme[]


  @Field(() => Vendor, { nullable: true }) 
  vendor?: Vendor  

}
