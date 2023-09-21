import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ProcedureTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  orderIndex?: string

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  isSystem?: boolean

  @Field({ nullable: true }) 
  removed?: boolean

  @Field({ nullable: true }) 
  modality?: string

}
