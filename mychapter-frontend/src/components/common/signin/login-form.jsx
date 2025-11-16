import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Activity } from "react";
import { Eye } from "lucide-react";

export function LoginForm({ className, handleChangeInput, formSignin, handleSubmit, errorForm, showPassword, handleShowPassword, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login to your account</CardTitle>
          <CardDescription className="text-center">Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Activity mode={errorForm ? "visible" : "hidden"}>
              <p className="text-center mb-5 text-red-500">{errorForm?.data}</p>
            </Activity>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" name="email" required autoComplete="email" value={formSignin.email} onChange={handleChangeInput} />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} name="password" placeholder="********" required autoComplete="current-password" value={formSignin.password} onChange={handleChangeInput} />
                  <Eye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleShowPassword} />
                </div>
              </Field>
              <Field>
                <Button type="submit">Signin</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
