import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CasePreProblemInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  sameRegion?: boolean

  @Field({ nullable: true }) 
  problemDate?: Date

  @Field({ nullable: true }) 
  duration?: string

  @Field({ nullable: true }) 
  symptoms?: string

  @Field({ nullable: true }) 
  regions?: string

  @Field({ nullable: true }) 
  removed?: boolean
}
