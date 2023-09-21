import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminUpdateClinicalProviderSpecialtyInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  npi?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  specialtyId?: string


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminUpdateClinicalProviderInput  


  @Field(() => AdminUpdateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminUpdateSpecialtyInput  

}