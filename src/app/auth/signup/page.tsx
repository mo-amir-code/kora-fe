import { AuthLayout, SignUpForm } from "@/components/auth";
import { APP_NAME } from "@/lib/constants";

const SignUpPage = () => {
  return (
    <AuthLayout pageTitle={`Sign Up | ${APP_NAME}`}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;