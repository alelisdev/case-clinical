import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class AdminCreateReviewInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  comment?: string

  @Field({ nullable: true }) 
  rating?: number

  @Field({ nullable: true }) 
  reivewDateAndTime?: Date

  @Field({ nullable: true }) 
  parentId?: string


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  

}