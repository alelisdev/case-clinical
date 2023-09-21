import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateLocationInput } from '@case-clinical/api/location/data-access' 
import { AdminCreateClinicalProviderLocationAvailabilityInput } from '@case-clinical/api/clinical-provider-location-availability/data-access' 


@InputType()
export class AdminCreateClinicalProviderLocationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field(() => [AdminCreateClinicalProviderLocationAvailabilityInput], { nullable: true }) 
  clinicalProviderLocationAvailabilities?: AdminCreateClinicalProviderLocationAvailabilityInput[]


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateLocationInput ,{ nullable: true }) 
  location?: AdminCreateLocationInput  

}