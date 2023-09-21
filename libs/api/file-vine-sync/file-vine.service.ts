import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as CryptoJS from 'crypto-js';
import { map, take } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

import * as dotenv from 'dotenv';
dotenv.config();

interface SessionResponse {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiry: string;
    refreshTokenTtl: string;
    userId: string;
    orgId: string;
  }

@Injectable()
export class FileVineService implements OnModuleInit {
  private apiKey: string;
  private apiSecret: string;
  public session: SessionResponse;

  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.FILEVINE_API_KEY!;
    this.apiSecret = process.env.FILEVINE_API_SECRET!;
  }

  async onModuleInit() {
    try {
        await this.startSession();
      } catch (error) {
        console.error("Failed to initialize session:", error);
      }
  }

  private generateAuthHash(): { timestamp: string; hash: string } {
    const timestamp = new Date().toISOString();
    const data = [this.apiKey, timestamp, this.apiSecret].join('/');
    const hash = CryptoJS.MD5(data).toString();
    return { timestamp, hash };
  }

async startSession(): Promise<void> {
  const { timestamp, hash } = this.generateAuthHash();

  const payload = {
    mode: 'key',
    apiKey: this.apiKey,
    apiHash: hash,
    apiTimestamp: timestamp,
  };

  const response = await firstValueFrom(
    this.httpService
      .post('https://api.filevine.io/session', payload)
      .pipe(map((res: any) => <SessionResponse>res.data))
  );

  console.log('response', response);

  this.session = {
    accessToken: response?.accessToken,
    refreshToken: response?.refreshToken,
    refreshTokenExpiry: response?.refreshTokenExpiry,
    userId: response?.userId,
    orgId: response?.orgId,
    refreshTokenTtl: response?.refreshTokenTtl,
  };

  if (!this.session?.accessToken) {
    throw new Error('Failed to initialize session.');
  }
}

  async getProjectById(projectId: {native: string, partner: string}) {
    if (!this.session) {
      await this.startSession();
    }

    const headers = {
        Authorization: `Bearer ${this.session?.accessToken}`,
        'x-fv-userid': this.session?.userId,
        'x-fv-orgid': this.session?.orgId,
        'x-fv-sessionid': this.session?.refreshToken,
      };

    let project = await firstValueFrom(this.httpService
      .get(`https://api.filevine.io/core/projects/${projectId.native}/forms/pchipa`, { headers })
      .pipe(map((response: any) => response.data)));

    return {projectId, project};
  }

  async getProjects() {
    const headers = {
      Authorization: `Bearer ${this.session?.accessToken}`,
      'x-fv-userid': this.session?.userId,
      'x-fv-orgid': this.session?.orgId,
      'x-fv-sessionid': this.session?.refreshToken,
    };

    const data  = await firstValueFrom(
        this.httpService.get(`https://api.filevine.io/core/projects?take=1000`, { headers })
          .pipe(map((response: any) => response.data))
      );

      const allProjects = await Promise.all(
        data?.items?.map((item) => this.getProjectById(item.projectId))
      );
    
      const filteredProjects = allProjects
      .filter((project) => project.applyForPCH !== undefined)
      .map((project) => {
        return {
          projectId: project.projectId,  // Assuming you have projectId in your project object
          formSection: {
            applyForPCH: project.applyForPCH,
            appliedOn: project.appliedOn,
            memberRegistrationNumber: project.memberRegistrationNumber,
            pharmacyControlNumber: project.pharmacyControlNumber,
            patientPortalLink: project.patientPortalLink,
            attorneyPortalLink: project.attorneyPortalLink,
          },
        };
      });
  
    return filteredProjects;
  }
}
