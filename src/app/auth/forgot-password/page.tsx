import { AuthLayout, ForgotPasswordForm } from "@/components/auth";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout pageTitle="Forgot Password | Kora">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;