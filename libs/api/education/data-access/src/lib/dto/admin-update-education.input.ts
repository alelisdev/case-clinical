import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminUpdateEducationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  school?: string

  @Field({ nullable: true }) 
  degree?: string

  @Field({ nullable: true }) 
  from?: Date

  @Field({ nullable: true }) 
  to?: Date


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminUpdateClinicalProviderInput  

}