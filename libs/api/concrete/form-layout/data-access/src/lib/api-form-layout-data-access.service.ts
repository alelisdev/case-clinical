import { FormLayout } from './../../../../../shared/util/sdk/src/generated/graphql';

import { BadRequestException, Injectable } from '@nestjs/common'
import { ApiCoreSharedService } from '@case-clinical/api/core/data-access'

@Injectable()
export class ApiFormLayoutDataAccessService {
  constructor(private readonly data: ApiCoreSharedService) { }

  async publicFormLayout(formName: string) {
    const formLayout = await this.data.formLayout.findFirst({
      where: {
        name: formName
      }
    });
    if (formLayout) {
      const { name, config } = formLayout;
      const customLayouts = {};
      await this.getCustomLayouts(name, config, customLayouts, true);
      return { ...formLayout, customLayouts: JSON.stringify(customLayouts) }
    } else {
      return null;
    }
  }

  async userFormLayout(userId: string, formName: string) {
    const formLayout = await this.data.formLayout.findFirst({
      where: {
        name: formName
      }
    });
    if (formLayout) {
      const { id, name, config } = formLayout;
      const customLayouts = {};
      await this.getCustomLayouts(name, config, customLayouts, true);
      return { ...formLayout, customLayouts: JSON.stringify(customLayouts) }
    } else {
      return null;
    }
  }

  async getCustomLayouts(name: string, formConfig: string, customLayouts: any, skip=false) {
    const customConfigRegExp = /(custom-component|custom-wrapper)[^a-zA-Z]+name[^a-zA-Z]+([a-z_A-Z/-]+)/g

    if(Object.keys(customLayouts).includes(name)) return;

    if (formConfig?.length > 0) {
      let m;
      const customLayoutNames = [];
      do {
        m = customConfigRegExp.exec(formConfig);
        if (m) {
          customLayoutNames.push(m[2]);
        }
      } while (m)

      console.log({ customLayoutNames })

      if(customLayoutNames.length > 0) {
        if(!skip)
          customLayouts[name] = formConfig;
        for(const key in customLayoutNames) {
          const _formName = customLayoutNames[key];
          const formLayout = await this.data.formLayout.findFirst({
            where: {
              name: _formName
            }
          });
          if(formLayout) {
            const { name, config } = formLayout;
            await this.getCustomLayouts(name, config, customLayouts);
          }
        }
      } else {
        console.log({ customLayouts })
        if(!skip)
          customLayouts[name] = formConfig;
      }
    }
  }

  async userWebTemplates(userId: string) {
    return this.data.formLayout.findMany({
      where: {
        type: 2,
      }
    })
  }

  async userWebWrappers(userId: string) {
    return this.data.formLayout.findMany({
      where: {
        type: 3,
      }
    })
  }

  async userWebTemplate(userId: string, formName: string) {
    return this.userFormLayout(userId, formName);
  }

  async userWebWrapper(userId: string, formName: string) {
    return this.userFormLayout(userId, formName);
  }

  async userWebComponent(userId: string, formName: string) {
    return this.userFormLayout(userId, formName);
  }

  async userWebComponents(userId: string) {
    return this.data.formLayout.findMany({
      where: {
        type: 1,
      }
    })
  }

  async userDeleteFormLayout(userId: string, formName: string) {
    const existing = await this.data.formLayout.findFirst({
      where: {
        id: formName
      }
    })
    if (!existing) {
      throw new BadRequestException('form layout does not exist')
    }

    return this.data.formLayout.delete({
      where: {
        id: formName
      }
    })
  }

  async userCreateFormLayout(userId: string, formName: string, config: string, type = 0) {
    const existing = await this.data.formLayout.findFirst({
      where: {
        id: formName
      }
    })
    if (existing) {
      throw new BadRequestException('Form layout with the same name exists already');
    }

    return this.data.formLayout.create({
      data: {
        id: formName,
        name: formName,
        config: config,
        type,
      }
    })
  }

  async userUpdateFormLayout(userId: string, formName: string, config: string, type = 0, previewImage = null, testData = null) {
    return this.data.formLayout.upsert({
      where: {
        id: formName
      },
      create: {
        id: formName,
        name: formName,
        config: config,
        type
      },
      update: {
        config: config,
        previewImage,
        testData,
      }
    })
  }
}

