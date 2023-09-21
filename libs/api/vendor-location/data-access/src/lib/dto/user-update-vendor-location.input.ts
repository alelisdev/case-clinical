import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLocationInput } from '@case-clinical/api/location/data-access' 
import { UserUpdateVendorInput } from '@case-clinical/api/vendor/data-access' 


@InputType()
export class UserUpdateVendorLocationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  

  @Field({ nullable: true }) 
  vendorId?: string

  // @Field({ nullable: true }) 
  // locationId?: string
  // @Field(() => UserUpdateLocationInput ,{ nullable: true }) 
  // location?: UserUpdateLocationInput  


  @Field(() => UserUpdateVendorInput ,{ nullable: true }) 
  vendor?: UserUpdateVendorInput  

}