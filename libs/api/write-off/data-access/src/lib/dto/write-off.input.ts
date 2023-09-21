import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class WriteOffInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  accountId?: string

  @Field({ nullable: true }) 
  writeOffStatusId?: string

  @Field({ nullable: true }) 
  amount?: number

  @Field({ nullable: true }) 
  createdBy?: string

  @Field({ nullable: true }) 
  dateCreated?: Date
}
