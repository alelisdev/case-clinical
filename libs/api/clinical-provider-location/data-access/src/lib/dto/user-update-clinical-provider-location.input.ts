import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserUpdateLocationInput } from '@case-clinical/api/location/data-access' 
import { UserUpdateClinicalProviderLocationAvailabilityInput } from '@case-clinical/api/clinical-provider-location-availability/data-access' 


@InputType()
export class UserUpdateClinicalProviderLocationInput {

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


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserUpdateClinicalProviderInput  


  @Field(() => UserUpdateLocationInput ,{ nullable: true }) 
  location?: UserUpdateLocationInput  

}