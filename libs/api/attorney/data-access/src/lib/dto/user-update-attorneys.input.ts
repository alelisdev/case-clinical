import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAttorneyInput } from './user-update-attorney.input'

@InputType()
export class UserUpdateAttorneysInput {
  @Field(() => [UserUpdateAttorneyInput], {nullable: true }) 
  attorneys: UserUpdateAttorneyInput[]
}
