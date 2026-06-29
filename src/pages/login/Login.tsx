import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { loginData } from "@/loginData/loginData";
import type { LoginData, LoginErrorsType } from "@/models/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function Login() {
  const [userData, setUserData] = useState<LoginData>({
    userEmail: "",
    password: "",
  });
  const [error, setError] = useState<LoginErrorsType | null>();
  const [successFullLogin, setSuccessfullLogin] = useState<boolean>(false);

  const userCorrectData = loginData;
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const { t } = useTranslation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userData.userEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
      userData.userEmail !== userCorrectData.userEmail
    ) {
      setError("email");
      return;
    }

    if (
      !userData.password.trim() ||
      userData.password !== userCorrectData.password
    ) {
      setError("password");
      return;
    }
    setError(null);
    setSuccessfullLogin(true);
    dispatch({ type: "LOGIN", payload: userData.userEmail });
  };

  useEffect(() => {
    if (successFullLogin) {
      navigate("/timesheet-overview");
    }
  }, [navigate, successFullLogin]);

  return (
    <div className="w-full flex-1 flex justify-center items-center bg-muted">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle>{t("login.insertCredential")}</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="login-email">
                {t("login.userEmail")}
              </FieldLabel>
              <Input
                type="email"
                id="login-email"
                onChange={(e) => {
                  setUserData({ ...userData, userEmail: e.target.value });
                  setError(null);
                }}
              />
              {error && error === "email" ? (
                <p>{t("login.errors.incorrectEmail")}</p>
              ) : (
                <></>
              )}
              <FieldLabel htmlFor="login-password">
                {t("login.password")}
              </FieldLabel>
              <Input
                type="password"
                id="login-password"
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                  setError(null);
                }}
              />
              {error && error === "password" ? (
                <p>{t("login.errors.incorrectPassword")}</p>
              ) : (
                <></>
              )}
            </Field>
            <Field orientation="horizontal">
              <Button variant="default">{t("login.loginBtn")}</Button>
            </Field>
          </FieldGroup>
        </form>
      </Card>
    </div>
  );
}

export default Login;
