import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access' 


@InputType()
export class AdminUpdateClinicalProviderLocationAvailabilityInput {

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


  @Field(() => AdminUpdateClinicalProviderLocationInput ,{ nullable: true }) 
  clinicalProviderLocation?: AdminUpdateClinicalProviderLocationInput  

}