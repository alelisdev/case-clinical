import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateSeverityInput } from './user-update-severity.input'

@InputType()
export class UserUpdateSeveritiesInput {
  @Field(() => [UserUpdateSeverityInput], {nullable: true }) 
  severities: UserUpdateSeverityInput[]
}
