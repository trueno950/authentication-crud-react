import "./login.scss";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Card, Input, Label } from "@/components";
import { useAppDispatch } from "@/store";
import { thunkLogin } from "@/store/auth/thunks";
import { thunkShowToast } from "@/store/toast/thunks";
import { validate_email, validate_password } from "@/utils";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [validateEmail, setValidateEmail] = useState({
    email: false,
    message: "",
  });

  const [validatePassword, setValidatePassword] = useState({
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const onInputChanged = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [target.name]: target.value });

    if (Object.keys(validateEmail).includes(target.name)) {
      setValidateEmail({
        message: validate_email(target.value),
        email: validate_email(target.value) === "" ? false : true,
      });
    } else if (Object.keys(validatePassword).includes(target.name)) {
      setValidatePassword({
        ...validatePassword,
        [target.name]: validate_password(target.value),
      });
    }
  };

  const buttonDisabled = () => {
    if (
      formValues.email === "" ||
      formValues.password === "" ||
      validatePassword.password ||
      validateEmail.email
    )
      return true;
    else return false;
  };

  const toNavigate = (path: string) => {
    navigate(`${path}`);
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(thunkLogin({ params: formValues }))
      .unwrap()
      .catch(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: "failed",
            description:
              "Ha ocurrido un error al intentar acceder, verifique sus accesos",
          })
        );
      });
  };

  return (
    <div className="login">
      <div className="title-welcome">
        <h2>¡Te damos la bienvenida a Vale Pay!</h2>
      </div>
      <Card className="login-content">
        <form className="form" onSubmit={formSubmit}>
          <div className="form-group">
            <Label labelText="Usuario" htmlFor="email" />
            <Input
              required
              id="email"
              name="email"
              value={formValues.email}
              onChange={onInputChanged}
            />
            {validateEmail.email && (
              <span className="form-error-message">
                {validateEmail.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <Label labelText="Contraseña " htmlFor="password" />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
            <Input
              required
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formValues.password}
              onChange={onInputChanged}
            />
            {validatePassword.password && (
              <>
                <span className="form-error-message">
                  La contraseña debe tener al menos:{" "}
                </span>
                <br />
                <span className="form-error-message">
                  Una longitud de 8 caracteres.
                </span>
                <br />
                <span className="form-error-message">
                  Una letra mayúscula (A-Z).
                </span>
                <br />
                <span className="form-error-message">
                  Una letra minúscula (a-z).
                </span>
                <br />
                <span className="form-error-message">
                  Un carácter especial(!@#$%)
                </span>
                <br />
              </>
            )}
          </div>
          <div className="form-button-login">
            <Button
              type="submit"
              title="Iniciar sesión"
              format="primary"
              disabled={buttonDisabled()}
            />
          </div>
          <p
            role="presentation"
            className="text-link"
            onClick={() => toNavigate("/register")}
          >
            <strong> Crear cuenta </strong>
          </p>
          <p
            role="presentation"
            className="text-link"
            onClick={() => toNavigate("/forgot")}
          >
            <strong> ¿Olvidaste tu contraseña?</strong>
          </p>
        </form>
      </Card>
    </div>
  );
};
