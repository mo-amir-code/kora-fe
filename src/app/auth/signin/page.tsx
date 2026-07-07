import { AuthLayout, SignInForm } from "@/components/auth";
import { APP_NAME } from "@/lib/constants";

const SignInPage = () => {
  return (
    <AuthLayout pageTitle={`Sign In | ${APP_NAME}`}>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;