import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminCreateClinicalProviderSpecialtyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  npi?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  specialtyId?: string


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminCreateSpecialtyInput  

}