import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateTaskTagInput } from '@case-clinical/api/task-tag/data-access' 
import { AdminCreateClinicalProviderTagInput } from '@case-clinical/api/clinical-provider-tag/data-access' 


@InputType()
export class AdminCreateTagInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateTaskTagInput], { nullable: true }) 
  taskTags?: AdminCreateTaskTagInput[]

  @Field(() => [AdminCreateClinicalProviderTagInput], { nullable: true }) 
  clinicalProviderTags?: AdminCreateClinicalProviderTagInput[]


}