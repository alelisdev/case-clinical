import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCasePreInjuryInput } from './user-update-case-pre-injury.input'

@InputType()
export class UserUpdateCasePreInjuriesInput {
  @Field(() => [UserUpdateCasePreInjuryInput], {nullable: true }) 
  casePreInjuries: UserUpdateCasePreInjuryInput[]
}
