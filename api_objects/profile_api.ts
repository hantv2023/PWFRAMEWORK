import { APIRequestContext, expect } from '@playwright/test';
import profileData from '../resources/profile.json';
import { API_URL } from '../env/API_URL';

type LoginResponse = {
    token: string;
};

export class ProfileApi {
    private readonly profileUrl = `${API_URL}/profile`;
    private readonly loginUrl = `${API_URL}/auth/login`;

    constructor(private readonly request: APIRequestContext) {}

    async login(): Promise<string> {
        const response = await this.request.post(this.loginUrl, {
            data: {
                password: 'hanguyen@123',
                username: 'hanguyen123',
            },
        });

        await expect(response).toBeOK();

        const body = (await response.json()) as LoginResponse;
        return body.token;
    }

    async updateProfile(profile: typeof profileData, token: string): Promise<void> {
        const response = await this.request.patch(this.profileUrl, {
            data: profile,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        await expect(response).toBeOK();
    }

    async resetFullName(): Promise<void> {
        const token = await this.login();

        await this.updateProfile(profileData, token);
    }
}
