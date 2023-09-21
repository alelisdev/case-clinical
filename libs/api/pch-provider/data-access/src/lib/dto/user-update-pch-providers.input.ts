import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePchProviderInput } from './user-update-pch-provider.input'

@InputType()
export class UserUpdatePchProvidersInput {
  @Field(() => [UserUpdatePchProviderInput], {nullable: true }) 
  pchProviders: UserUpdatePchProviderInput[]
}
