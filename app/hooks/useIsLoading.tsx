import { useNavigation } from "react-router";

type Opts = {
  action?: string;
};

export default function useIsLoading({ action }: Opts = {}) {
  const navigation = useNavigation();

  if (action && action !== navigation.formAction) return false;

  return navigation.state === "loading" || navigation.state === "submitting";
}
