import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminUpdateLocationInput } from '@case-clinical/api/location/data-access' 
import { UserUpdateClinicalProviderLocationAvailabilityInput } from '@case-clinical/api/clinical-provider-location-availability/data-access' 


@InputType()
export class AdminUpdateClinicalProviderLocationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field(() => [UserUpdateClinicalProviderLocationAvailabilityInput], { nullable: true }) 
  clinicalProviderLocationAvailabilities?: UserUpdateClinicalProviderLocationAvailabilityInput[]


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminUpdateClinicalProviderInput  


  @Field(() => AdminUpdateLocationInput ,{ nullable: true }) 
  location?: AdminUpdateLocationInput  

}