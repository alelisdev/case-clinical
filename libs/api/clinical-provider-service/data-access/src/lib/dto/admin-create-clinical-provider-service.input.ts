import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateServiceInput } from '@case-clinical/api/service/data-access' 
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminCreateClinicalProviderServiceInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  serviceId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string


  @Field(() => AdminCreateServiceInput ,{ nullable: true }) 
  service?: AdminCreateServiceInput  


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  

}