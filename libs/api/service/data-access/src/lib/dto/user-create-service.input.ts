import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClinicalProviderServiceInput } from '@case-clinical/api/clinical-provider-service/data-access' 


@InputType()
export class UserCreateServiceInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateClinicalProviderServiceInput], { nullable: true }) 
  clinicalProviderServices?: UserCreateClinicalProviderServiceInput[]


}
