import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateTagInput } from '@case-clinical/api/tag/data-access' 


@InputType()
export class AdminCreateClinicalProviderTagInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  tagId?: string


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateTagInput ,{ nullable: true }) 
  tag?: AdminCreateTagInput  

}