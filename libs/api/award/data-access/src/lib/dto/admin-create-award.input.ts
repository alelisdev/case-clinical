import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminCreateAwardInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  school?: string

  @Field({ nullable: true }) 
  awardedAt?: Date

  @Field({ nullable: true }) 
  note?: string


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  

}