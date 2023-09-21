import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CaseStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  orderIndex?: number

  @Field({ nullable: true }) 
  color?: string

  @Field({ nullable: true }) 
  isDefault?: boolean

  @Field({ nullable: true }) 
  tickerDate?: number

  @Field({ nullable: true }) 
  maxTickerDate?: number

  @Field({ nullable: true }) 
  moveDocs?: boolean

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  removed?: boolean

  @Field({ nullable: true }) 
  createdBy?: string

  @Field({ nullable: true }) 
  migSource?: string

  @Field({ nullable: true }) 
  entity?: string

  @Field({ nullable: true }) 
  temp?: string

}
