import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateEthnicityInput } from './user-update-ethnicity.input'

@InputType()
export class UserUpdateEthnicitiesInput {
  @Field(() => [UserUpdateEthnicityInput], {nullable: true }) 
  ethnicities: UserUpdateEthnicityInput[]
}
