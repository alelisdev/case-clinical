import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLocationInput } from '@case-clinical/api/location/data-access' 
import { UserCreateVendorInput } from '@case-clinical/api/vendor/data-access' 


@InputType()
export class UserCreateVendorLocationInput {

  @Field({ nullable: true }) 
  name?: string



  @Field({ nullable: true }) 
  vendorId?: string

  // @Field({ nullable: true }) 
  // locationId?: string
  // @Field(() => UserCreateLocationInput ,{ nullable: true }) 
  // location?: UserCreateLocationInput  


  @Field(() => UserCreateVendorInput ,{ nullable: true }) 
  vendor?: UserCreateVendorInput  

}
