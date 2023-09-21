import { Field,InputType } from '@nestjs/graphql'

@InputType()
export class UserMarkNotificationsReadInput {
  @Field(() => [String], { nullable: true }) 
  notificationIds?: string[]  
}
