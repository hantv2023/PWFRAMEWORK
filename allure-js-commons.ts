import * as allure from 'allure-js-commons';
import { ContentType } from 'allure-js-commons';

export async function step<T>(name: string, action: () => Promise<T>): Promise<T> {
    return allure.step(name, action);
}

export { allure };
export { ContentType };
