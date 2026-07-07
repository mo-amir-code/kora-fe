import { AuthLayout, ForgotPasswordForm } from "@/components/auth";
import { APP_NAME } from "@/lib/constants";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout pageTitle={`Forgot Password | ${APP_NAME}`}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;