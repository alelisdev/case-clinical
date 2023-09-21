import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateNotificationInput } from './user-update-notification.input'

@InputType()
export class UserUpdateNotificationsInput {
  @Field(() => [UserUpdateNotificationInput], {nullable: true }) 
  notifications: UserUpdateNotificationInput[]
}
