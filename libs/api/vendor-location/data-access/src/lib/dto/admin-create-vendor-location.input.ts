import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLocationInput } from '@case-clinical/api/location/data-access' 
import { AdminCreateVendorInput } from '@case-clinical/api/vendor/data-access' 


@InputType()
export class AdminCreateVendorLocationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  vendorId?: string


  @Field(() => AdminCreateLocationInput ,{ nullable: true }) 
  location?: AdminCreateLocationInput  


  @Field(() => AdminCreateVendorInput ,{ nullable: true }) 
  vendor?: AdminCreateVendorInput  

}