import { Page, test as base } from "@playwright/test";
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures,
} from "@playwright-testing-library/test/fixture";
import { Screen } from "@playwright-testing-library/test/dist/fixture/types";
import { faker } from "@faker-js/faker";
import { createUser } from "~/data/users.server";

export const test = base.extend<TestingLibraryFixtures>(fixtures);
export const expect = test.expect;

export const BUILD_URL = (url = "/") => `http://localhost:3001${url}`;

export async function createUserAndLogin(page: Page, screen: Screen) {
  const password = faker.internet.password(8);
  const { errors, data } = await createUser({
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password,
    passwordConfirmation: password,
  });

  if (!data) throw errors;

  await page.goto(BUILD_URL());

  await screen.getByLabelText("Email").fill(data.email);
  await screen.getByLabelText("Password").fill(password);
  await screen.getByText("Login").click();
  await screen.findByText(`Welcome, ${data.name}!`);

  return data;
}
