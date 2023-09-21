import { Field, InputType } from '@nestjs/graphql'

import { UserCreateWhereDoesItHurtInput } from '@case-clinical/api/where-does-it-hurt/data-access'
// import { UserCreateClinicalFindingInput } from '@case-clinical/api/clinical-finding/data-access'
import { IsNotEmpty } from 'class-validator'


@InputType()
export class UserCreateSideInput {

  @IsNotEmpty({ message: 'Name should not be empty' })
  @Field({ nullable: true })
  name?: string

  @Field(() => [UserCreateWhereDoesItHurtInput], { nullable: true })
  whereDoesItHurts?: UserCreateWhereDoesItHurtInput[]

  // @Field(() => [UserCreateClinicalFindingInput], { nullable: true })
  // clinicalFindings?: UserCreateClinicalFindingInput[]


}
