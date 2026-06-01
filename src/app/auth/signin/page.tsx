import { AuthLayout, SignInForm } from "@/components/auth";

const SignInPage = () => {
  return (
    <AuthLayout pageTitle="Sign In | Kora">
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;