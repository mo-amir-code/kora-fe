import { AuthLayout, ResetPasswordForm } from "@/components/auth";
import { APP_NAME } from "@/lib/constants";

const ResetPasswordPage = () => {
  return (
    <AuthLayout pageTitle={`Reset Password | ${APP_NAME}`}>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;