import { AuthLayout, ResetPasswordForm } from "@/components/auth";

const ResetPasswordPage = () => {
  return (
    <AuthLayout pageTitle="Reset Password | Kora">
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;