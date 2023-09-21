import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateTaskTagInput } from '@case-clinical/api/task-tag/data-access' 
import { UserUpdateClinicalProviderTagInput } from '@case-clinical/api/clinical-provider-tag/data-access' 


@InputType()
export class UserUpdateTagInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateTaskTagInput], { nullable: true }) 
  taskTags?: UserUpdateTaskTagInput[]

  @Field(() => [UserUpdateClinicalProviderTagInput], { nullable: true }) 
  clinicalProviderTags?: UserUpdateClinicalProviderTagInput[]


}