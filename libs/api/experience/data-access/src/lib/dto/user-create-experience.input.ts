import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class UserCreateExperienceInput {

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  workplace?: string

  @Field({ nullable: true }) 
  from?: Date

  @Field({ nullable: true }) 
  to?: Date


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  

}
