import { Field, ObjectType } from '@nestjs/graphql'

import { TaskTag } from '@case-clinical/api/task-tag/data-access' 
import { ClinicalProviderTag } from '@case-clinical/api/clinical-provider-tag/data-access' 


@ObjectType()
export class Tag {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [TaskTag], { nullable: true }) 
  taskTags?: TaskTag[]

  @Field(() => [ClinicalProviderTag], { nullable: true }) 
  clinicalProviderTags?: ClinicalProviderTag[]


}
