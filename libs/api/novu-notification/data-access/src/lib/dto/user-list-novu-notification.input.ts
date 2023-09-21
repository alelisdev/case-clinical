import { Field, InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'
@InputType()
export class UserListNovuNotificationInput extends CorePagingInput {

  @Field({ nullable: true })
  tag?: string

  @Field({ nullable: true })
  read?: boolean

  @Field({ nullable: true })
  appointmentId?: string

}
