import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateServiceInput } from '@case-clinical/api/service/data-access' 
import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminUpdateClinicalProviderServiceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  serviceId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string


  @Field(() => AdminUpdateServiceInput ,{ nullable: true }) 
  service?: AdminUpdateServiceInput  


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminUpdateClinicalProviderInput  

}