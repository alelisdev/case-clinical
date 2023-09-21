import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { AdminCreatePriorAuthDmeInput } from '@case-clinical/api/prior-auth-dme/data-access' 


@InputType()
export class AdminCreateDurableMedicalEquipmentInput {

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

  @Field(() => [AdminCreatePriorAuthDmeInput], { nullable: true }) 
  priorAuthDmes?: AdminCreatePriorAuthDmeInput[]


  @Field(() => AdminCreateVendorInput ,{ nullable: true }) 
  vendor?: AdminCreateVendorInput  

}