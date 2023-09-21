import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateWhereDoesItHurtInput } from '@case-clinical/api/where-does-it-hurt/data-access'
// import { UserUpdateClinicalFindingInput } from '@case-clinical/api/clinical-finding/data-access'
import { IsNotEmpty } from 'class-validator'


@InputType()
export class UserUpdateSideInput {

  @Field({ nullable: true })
  id?: string

  @IsNotEmpty({ message: 'Name should not be empty' })
  @Field({ nullable: true })
  name?: string

  @Field(() => [UserUpdateWhereDoesItHurtInput], { nullable: true })
  whereDoesItHurts?: UserUpdateWhereDoesItHurtInput[]

  // @Field(() => [UserUpdateClinicalFindingInput], { nullable: true })
  // clinicalFindings?: UserUpdateClinicalFindingInput[]


}
