import { Field,InputType } from '@nestjs/graphql'

@InputType()
export class UserMarkMessagesReadInput {
  @Field(() => [String], { nullable: true }) 
  messageIds?: string[]  
}
