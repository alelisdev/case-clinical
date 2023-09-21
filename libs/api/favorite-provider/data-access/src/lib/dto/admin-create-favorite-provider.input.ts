import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminCreateFavoriteProviderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  specialtyId?: string


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  

}