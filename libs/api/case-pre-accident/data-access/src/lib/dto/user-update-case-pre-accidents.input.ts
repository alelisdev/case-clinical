import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCasePreAccidentInput } from './user-update-case-pre-accident.input'

@InputType()
export class UserUpdateCasePreAccidentsInput {
  @Field(() => [UserUpdateCasePreAccidentInput], {nullable: true }) 
  casePreAccidents: UserUpdateCasePreAccidentInput[]
}
