import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class UserUpdateExperienceInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserUpdateClinicalProviderInput  

}