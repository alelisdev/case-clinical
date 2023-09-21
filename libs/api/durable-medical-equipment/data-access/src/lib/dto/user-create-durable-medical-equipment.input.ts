import { Field, InputType } from '@nestjs/graphql'

import { UserCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { UserCreatePriorAuthDmeInput } from '@case-clinical/api/prior-auth-dme/data-access' 


@InputType()
export class UserCreateDurableMedicalEquipmentInput {

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

  @Field(() => [UserCreatePriorAuthDmeInput], { nullable: true }) 
  priorAuthDmes?: UserCreatePriorAuthDmeInput[]


  @Field(() => UserCreateVendorInput ,{ nullable: true }) 
  vendor?: UserCreateVendorInput  

}
