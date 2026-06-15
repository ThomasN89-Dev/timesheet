import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginData } from "@/loginData/loginData";
import type { LoginData } from "@/models/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [userData, setUserData] = useState<LoginData>({
    userEmail: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [successFullLogin, setSuccessfullLogin] = useState<boolean>(false);

  const userCorrectData = loginData;
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userData.userEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
      userData.userEmail !== userCorrectData.userEmail
    ) {
      setError("Email non valida");
      return;
    }

    if (
      !userData.password.trim() ||
      userData.password !== userCorrectData.password
    ) {
      setError("Password non valida");
      return;
    }
    setError("");
    setSuccessfullLogin(true);
  };

  useEffect(() => {
    if (successFullLogin) {
      navigate("/timesheet-overview");
    }
  }, [navigate, successFullLogin]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-muted">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle>Accedi al tuo account</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="login-email">Email:</FieldLabel>
              <Input
                type="email"
                id="login-email"
                onChange={(e) => {
                  setUserData({ ...userData, userEmail: e.target.value });
                  setError("");
                }}
              />
              {error && error.toLowerCase().includes("email") ? (
                <p>{error}</p>
              ) : (
                <></>
              )}
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                type="password"
                id="login-password"
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                  setError("");
                }}
              />
              {error && error.toLowerCase().includes("password") ? (
                <p>{error}</p>
              ) : (
                <></>
              )}
            </Field>
            <Field orientation="horizontal">
              <Button variant="default">Login</Button>
            </Field>
          </FieldGroup>
        </form>
      </Card>
    </div>
  );
}

export default Login;
