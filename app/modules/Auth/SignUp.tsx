import { Form, Link, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import { CheckboxField } from "~/components/ui/checkbox-field";
import { InputField } from "~/components/ui/input-field";
import { GenericDataError } from "~/data/utils/types";
import useIsLoading from "~/hooks/useIsLoading";

export default function SignUp() {
  const errors = useActionData<GenericDataError>();
  const isLoading = useIsLoading();

  return (
    <Card className="mx-auto flex w-full max-w-lg items-center justify-center">
      <Form
        method="post"
        action="/signup"
        className="flex w-full flex-col space-y-4 p-10"
      >
        <CardTitle className="mb-8">Please sign up</CardTitle>

        <InputField
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          errors={errors}
        />

        <InputField
          label="Name"
          name="name"
          type="text"
          required
          placeholder="How you would like to be called"
          errors={errors}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="**************"
          required
          errors={errors}
        />

        <InputField
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          required
          errors={errors}
        />

        <CheckboxField name="rememberMe" label="Remember me" className="pb-4" />

        <Button type="submit" className="mt-8" isLoading={isLoading}>
          Sign up
        </Button>

        <Link to="/login" className="link text-center">
          Or login instead
        </Link>
      </Form>
    </Card>
  );
}
