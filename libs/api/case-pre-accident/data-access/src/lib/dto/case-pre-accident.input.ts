import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CasePreAccidentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  accidentDate?: string

  @Field({ nullable: true }) 
  injuries?: string

  @Field({ nullable: true }) 
  symptoms?: string

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  removed?: boolean
}
