import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 


@InputType()
export class UserUpdateClinicalProviderLocationAvailabilityInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  day?: string

  @Field({ nullable: true }) 
  startTime?: string

  @Field({ nullable: true }) 
  endTime?: string

  @Field({ nullable: true }) 
  clinicalProviderLocationId?: string


  @Field(() => UserUpdateClinicalProviderLocationInput ,{ nullable: true }) 
  clinicalProviderLocation?: UserUpdateClinicalProviderLocationInput  

}