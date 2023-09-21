import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCasePreProblemInput } from './user-update-case-pre-problem.input'

@InputType()
export class UserUpdateCasePreProblemsInput {
  @Field(() => [UserUpdateCasePreProblemInput], {nullable: true }) 
  casePreProblems: UserUpdateCasePreProblemInput[]
}
