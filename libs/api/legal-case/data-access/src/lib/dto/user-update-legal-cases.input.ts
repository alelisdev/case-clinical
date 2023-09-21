import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLegalCaseInput } from './user-update-legal-case.input'

@InputType()
export class UserUpdateLegalCasesInput {
  @Field(() => [UserUpdateLegalCaseInput], {nullable: true }) 
  legalCases: UserUpdateLegalCaseInput[]
}
