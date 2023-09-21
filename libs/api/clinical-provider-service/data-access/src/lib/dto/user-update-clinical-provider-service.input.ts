import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateServiceInput } from '@case-clinical/api/service/data-access' 
import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class UserUpdateClinicalProviderServiceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  serviceId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string


  @Field(() => UserUpdateServiceInput ,{ nullable: true }) 
  service?: UserUpdateServiceInput  


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserUpdateClinicalProviderInput  

}