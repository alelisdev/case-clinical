import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 


@InputType()
export class AdminCreateClinicalProviderLocationAvailabilityInput {

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


  @Field(() => AdminCreateClinicalProviderLocationInput ,{ nullable: true }) 
  clinicalProviderLocation?: AdminCreateClinicalProviderLocationInput  

}