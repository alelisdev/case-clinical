import { Field, ObjectType } from '@nestjs/graphql'
import { Course } from '@case-clinical/api/academy/course/data-access'

@ObjectType()
export class AcademyCategory {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  slug?: string

  @Field({ nullable: true })
  title?: string

  @Field(() => [Course], { nullable: true })
  courses?: Course[]
}
