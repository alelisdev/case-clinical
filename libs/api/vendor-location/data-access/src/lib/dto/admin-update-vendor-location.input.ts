import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLocationInput } from '@case-clinical/api/location/data-access' 
import { AdminUpdateVendorInput } from '@case-clinical/api/vendor/data-access' 


@InputType()
export class AdminUpdateVendorLocationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  vendorId?: string


  @Field(() => AdminUpdateLocationInput ,{ nullable: true }) 
  location?: AdminUpdateLocationInput  


  @Field(() => AdminUpdateVendorInput ,{ nullable: true }) 
  vendor?: AdminUpdateVendorInput  

}