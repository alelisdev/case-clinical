import { Field, InputType } from '@nestjs/graphql'

import { UserCreateServiceInput } from '@case-clinical/api/service/data-access' 
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class UserCreateClinicalProviderServiceInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  serviceId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string


  @Field(() => UserCreateServiceInput ,{ nullable: true }) 
  service?: UserCreateServiceInput  


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  

}
