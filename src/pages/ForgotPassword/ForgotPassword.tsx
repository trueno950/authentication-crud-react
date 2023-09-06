import "./ForgotPassword.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input, Label, Loader, RouterBack } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { thunkRecoverPassword } from "@/store/auth/thunks";
import { thunkShowToast } from "@/store/toast/thunks";
import { validate_email } from "@/utils";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { recoveringPassword } = useAppSelector((store) => store.auth);

  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [validateEmail, setValidateEmail] = useState({
    email: false,
    message: "",
  });

  const onElementChanged = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [target.name]: target.value });
    if (Object.keys(validateEmail).includes(target.name)) {
      setValidateEmail({
        message: validate_email(target.value),
        email: validate_email(target.value) === "" ? false : true,
      });
    }
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(thunkRecoverPassword(formValues))
      .unwrap()
      .then(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: "success",
            description:
              "Se le enviaron las instrucciones en su email para restaurar su contraseña",
          })
        );
        navigate("/login");
      })
      .catch(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: "failed",
            description: "Ha ocurrido un error. Por favor intente de nuevo",
          })
        );
      });
  };

  return (
    <div className="forgot">
      <div className="forgot-content">
        <div className="forgot-content-card">
          <header className="forgot-header">
            <div className="forgot-header-items">
              <RouterBack />
              <b>Regresar</b>
            </div>
          </header>
          <h3 className="text-center">Recuperación de contraseña</h3>
          <p className="text-center label-small">
            Se le enviará un email a la dirección de correo proporcionada con
            los pasos a seguir para la recuperación su contraseña.
          </p>
          {!recoveringPassword && (
            <form className="forgot-form" onSubmit={formSubmit}>
              <div className="form-group">
                <Label labelText="Correo *" />
                <Input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={onElementChanged}
                />
                {validateEmail.email && (
                  <span className="form-error-message">
                    {validateEmail.message}
                  </span>
                )}
              </div>
              <div className="forgot-actions">
                <Button
                  type="submit"
                  title="Enviar"
                  format="primary"
                  disabled={validateEmail.email || formValues.email === ""}
                />
              </div>
            </form>
          )}
          {recoveringPassword && <Loader>Espere por favor...</Loader>}
        </div>
      </div>
    </div>
  );
};
