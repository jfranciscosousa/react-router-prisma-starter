import { Form, useActionData } from "@remix-run/react";
import type {
  DataFunctionArgs,
  SerializeFrom,
  V2_MetaFunction,
} from "@vercel/remix";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { FullInput } from "~/components/ui/full-input";
import { UpdateUserParams, updateUser } from "~/server/users.server";
import useIsLoading from "~/hooks/useIsLoading";
import useToast from "~/hooks/useToast";
import useUser from "~/hooks/useUser";
import { userIdFromRequest } from "~/server/auth.server";
import { Card, CardTitle } from "~/components/ui/card";

export type ProfileRouteAction = SerializeFrom<typeof action>;

export const action = async ({ request }: DataFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const form = Object.fromEntries(await request.formData());

  const { errors } = await updateUser(userId, form as UpdateUserParams);

  if (errors) return { errors, success: false };

  return { errors: null, success: true };
};

export const meta: V2_MetaFunction = () => [
  {
    title: "Profile",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function Profile() {
  const user = useUser();
  const actionData = useActionData<ProfileRouteAction>();
  const { toast } = useToast();
  const isLoading = useIsLoading();

  useEffect(() => {
    if (actionData?.errors) toast("Failed to update profile!", "error");
    else if (actionData?.success) toast("Updated profile!", "success");
  }, [actionData, toast]);

  return (
    <Card className="max-w-lg w-full mx-auto flex items-center justify-center">
      <Form method="post" className="p-10 w-full flex flex-col space-y-4">
        <CardTitle className="mb-8">Edit your profile</CardTitle>

        <FullInput
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          defaultValue={user.email}
          errors={actionData?.errors}
        />

        <FullInput
          label="Name"
          name="name"
          type="text"
          required
          placeholder="How you would like to be called"
          defaultValue={user.name}
          errors={actionData?.errors}
        />

        <FullInput
          label="Current password"
          name="currentPassword"
          type="password"
          placeholder="**************"
          required
          errors={actionData?.errors}
        />

        <FullInput
          label="New password"
          name="newPassword"
          type="password"
          placeholder="**************"
          errors={actionData?.errors}
        />

        <FullInput
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          errors={actionData?.errors}
          className="pb-4"
        />

        <Button type="submit" isLoading={isLoading}>
          Update profile
        </Button>
      </Form>
    </Card>
  );
}
