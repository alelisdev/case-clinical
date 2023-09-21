import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateServiceInput } from './user-update-service.input'

@InputType()
export class UserUpdateServicesInput {
  @Field(() => [UserUpdateServiceInput], {nullable: true }) 
  services: UserUpdateServiceInput[]
}
