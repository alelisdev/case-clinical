import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderServiceInput } from '@case-clinical/api/clinical-provider-service/data-access' 


@InputType()
export class AdminCreateServiceInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateClinicalProviderServiceInput], { nullable: true }) 
  clinicalProviderServices?: AdminCreateClinicalProviderServiceInput[]


}