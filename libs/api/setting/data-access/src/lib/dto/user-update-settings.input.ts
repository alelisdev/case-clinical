import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateSettingInput } from './user-update-setting.input'

@InputType()
export class UserUpdateSettingsInput {
  @Field(() => [UserUpdateSettingInput], {nullable: true }) 
  settings: UserUpdateSettingInput[]
}
