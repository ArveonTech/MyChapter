// component
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";

// utils
import { Activity } from "react";

export function SignupForm({ handleChangeInput, formSignin, handleSubmit, errorForm, showPassword, handleShowPassword, errorInputForm, ...props }) {
  console.info(errorInputForm);
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Create an account</CardTitle>
        <CardDescription className="text-center">Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Activity mode={!errorForm?.success ? "visible" : "hidden"}>
            <p className={`text-center text-red-500 mb-5 `}>{errorForm?.response?.data}</p>
          </Activity>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="John Doe" name="username" required value={formSignin.username} onChange={handleChangeInput} />
              <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.username ? "visible" : "hidden"}>
                <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.username}</p>
              </Activity>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" name="email" required value={formSignin.email} onChange={handleChangeInput} />
              <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.email ? "visible" : "hidden"}>
                <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.email}</p>
              </Activity>
              <FieldDescription>We will not share your email with anyone else.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="********" required value={formSignin.password} onChange={handleChangeInput} />
                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword} />
              </div>
              <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.password ? "visible" : "hidden"}>
                <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.password}</p>
              </Activity>
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input id="confirm-password" type="password" placeholder="********" name="confirmPassword" required value={formSignin.confirmPassword} onChange={handleChangeInput} />
              <Activity mode={!errorInputForm?.success && errorInputForm?.inputForm.confirmPassword ? "visible" : "hidden"}>
                <p className="text-xs text-red-500 italic">*{errorInputForm?.inputForm.confirmPassword}</p>
              </Activity>
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/auth/signin">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
