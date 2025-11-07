import { InputOTPForm } from "@/components/Auth/OtpCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function OtpVerificationPage() {
  return (
    <div className="flex h-screen justify-center tracking-tighter items-center">
      <Card>
        <CardHeader className="text-3xl font-extrabold">Verify OTP</CardHeader>
        <CardContent>
          <InputOTPForm />
        </CardContent>
      </Card>
    </div>
  );
}
