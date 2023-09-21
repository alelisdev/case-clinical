import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { AdminCreateUserCourseProgressInput } from './dto/admin-create-user-course-progress.input'
import { AdminListUserCourseProgressInput } from './dto/admin-list-user-course-progress.input'
import { AdminUpdateUserCourseProgressInput } from './dto/admin-update-user-course-progress.input'

@Injectable()
export class ApiUserCourseProgressDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminUserCourseProgresses(adminId: string, input?: AdminListUserCourseProgressInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCourseProgress.findMany({
      where: {
        name: {
          contains: input?.name,
        },
      },
      take: input?.limit,
      skip: input?.skip,
      include: { user: true, course: true },
    })
  }

  async adminCountUserCourseProgresses(adminId: string, input?: AdminListUserCourseProgressInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

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

  async adminUserCourseProgress(adminId: string, userCourseProgressId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCourseProgress.findUnique({
      where: { id: userCourseProgressId },
      include: { user: true, course: true },
    })
  }

  async adminCreateUserCourseProgress(adminId: string, input: AdminCreateUserCourseProgressInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCourseProgress.create({
      data: {
        user:
          input.userId != null
            ? {
                connect: {
                  id: input.userId,
                },
              }
            : undefined,
        course:
          input.courseId != null
            ? {
                connect: {
                  id: input.courseId,
                },
              }
            : undefined,
        name: input.name,
        currentStep: input.currentStep,
        completed: input.completed,
      },
      include: { user: true, course: true },
    })
  }

  async adminUpdateUserCourseProgress(
    adminId: string,
    userCourseProgressId,
    input: AdminUpdateUserCourseProgressInput,
  ) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCourseProgress.update({
      where: { id: userCourseProgressId },
      data: {
        name: input.name,
        userId: input.userId,
        courseId: input.courseId,
        currentStep: input.currentStep,
        completed: input.completed,
      },
      include: { user: true, course: true },
    })
  }

  async adminDeleteUserCourseProgress(adminId: string, userCourseProgressId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.userCourseProgress.delete({ where: { id: userCourseProgressId } })
  }
}
