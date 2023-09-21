import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminUpdateAwardInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminUpdateClinicalProviderInput  

}