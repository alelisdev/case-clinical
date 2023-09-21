import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCaseTypeInput } from './user-update-case-type.input'

@InputType()
export class UserUpdateCaseTypesInput {
  @Field(() => [UserUpdateCaseTypeInput], {nullable: true }) 
  caseTypes: UserUpdateCaseTypeInput[]
}
