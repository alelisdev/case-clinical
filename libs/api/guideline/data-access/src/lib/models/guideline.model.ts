import { Field, ObjectType } from '@nestjs/graphql'

import { PriorAuthGuideline } from '@case-clinical/api/prior-auth-guideline/data-access' 


@ObjectType()
export class Guideline {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [PriorAuthGuideline], { nullable: true }) 
  priorAuthGuidelines?: PriorAuthGuideline[]


}
