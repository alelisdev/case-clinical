import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CasePreInjuryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  affectsInjury?: boolean

  @Field({ nullable: true }) 
  injuryDate?: string

  @Field({ nullable: true }) 
  injured?: string

  @Field({ nullable: true }) 
  anatomic?: string

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  removed?: boolean
}
