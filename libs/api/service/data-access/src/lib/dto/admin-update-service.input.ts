import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClinicalProviderServiceInput } from '@case-clinical/api/clinical-provider-service/data-access' 


@InputType()
export class AdminUpdateServiceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateClinicalProviderServiceInput], { nullable: true }) 
  clinicalProviderServices?: UserUpdateClinicalProviderServiceInput[]


}