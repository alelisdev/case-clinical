import { Field, InputType } from '@nestjs/graphql'

import { UserCreateTaskTagInput } from '@case-clinical/api/task-tag/data-access' 
import { UserCreateClinicalProviderTagInput } from '@case-clinical/api/clinical-provider-tag/data-access' 


@InputType()
export class UserCreateTagInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateTaskTagInput], { nullable: true }) 
  taskTags?: UserCreateTaskTagInput[]

  @Field(() => [UserCreateClinicalProviderTagInput], { nullable: true }) 
  clinicalProviderTags?: UserCreateClinicalProviderTagInput[]


}
