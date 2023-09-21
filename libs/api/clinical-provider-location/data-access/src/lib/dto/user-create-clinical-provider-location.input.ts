import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateLocationInput } from '@case-clinical/api/location/data-access' 
import { UserCreateClinicalProviderLocationAvailabilityInput } from '@case-clinical/api/clinical-provider-location-availability/data-access' 


@InputType()
export class UserCreateClinicalProviderLocationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field(() => [UserCreateClinicalProviderLocationAvailabilityInput], { nullable: true }) 
  clinicalProviderLocationAvailabilities?: UserCreateClinicalProviderLocationAvailabilityInput[]


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateLocationInput ,{ nullable: true }) 
  location?: UserCreateLocationInput  

}
