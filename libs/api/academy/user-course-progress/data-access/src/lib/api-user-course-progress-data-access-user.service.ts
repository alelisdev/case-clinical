import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { UserCreateUserCourseProgressInput } from './dto/user-create-user-course-progress.input'
import { UserListUserCourseProgressInput } from './dto/user-list-user-course-progress.input'
import { UserUpdateUserCourseProgressInput } from './dto/user-update-user-course-progress.input'

@Injectable()
export class ApiUserCourseProgressDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userUserCourseProgresses(userId: string, input?: UserListUserCourseProgressInput) {
    return this.data.userCourseProgress.findMany({
      where: {
        AND: [
          {
            name: { contains: input?.name },
            userId: input?.userId,
            courseId: input?.courseId,
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { user: true, course: true },
    })
  }

  async userCountUserCourseProgresses(userId: string, input?: UserListUserCourseProgressInput): Promise<CorePaging> {
    const total = await this.data.userCourseProgress.count({
      where: {
        name: {
          contains: input?.name,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUserCourseProgress(userId: string, userCourseProgressId) {
    return this.data.userCourseProgress.findUnique({
      where: { id: userCourseProgressId },
      include: { user: true, course: true },
    })
  }

  async userCreateUserCourseProgress(userId: string, input: UserCreateUserCourseProgressInput) {
    return this.data.userCourseProgress.create({
      data: {
        user:
            {
              connect: {
                id: userId,
              },
            },
        course:
          input.courseId != null
            ? {
                connect: {
                  id: input.courseId,
                },
              }
            : undefined,
        name: "",
        currentStep: 0,
        completed: 0,
      },
      include: { user: true, course: true },
    })
  }

  async userUpdateUserCourseProgress(
    userId: string,
    userCourseProgressId: string,
    input: UserUpdateUserCourseProgressInput,
  ) {
    const courseProgress = await this.data.userCourseProgress.findUnique({
      where: { id: userCourseProgressId }
    })
    const course = await this.data.course.findFirst({
      where: { id: courseProgress.courseId }
    })
    const completed = (course.totalSteps <= input.currentStep);
    return this.data.userCourseProgress.update({
      where: { id: userCourseProgressId },
      data: {
        name: input.name,
        userId: input.userId,
        courseId: input.courseId,
        currentStep: completed ? 0 : input.currentStep,
        completed: {
          increment: completed ? 1 : 0
        }
      },
      include: { user: true, course: true },
    })
  }

  async userDeleteUserCourseProgress(userId: string, userCourseProgressId: string) {
    return this.data.userCourseProgress.delete({ where: { id: userCourseProgressId } })
  }
}
