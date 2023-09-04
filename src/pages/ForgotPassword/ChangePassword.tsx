import "./ChangePassword.scss";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Input, Label } from "@/components";
import { useAppDispatch } from "@/store";
import { thunkChangePassword } from "@/store/auth/thunks";
import { thunkShowToast } from "@/store/toast/thunks";
import { validate_password } from "@/utils";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useParams();

  const [formValues, setFormValues] = useState({
    password: "",
    newPassword: "",
  });
  const [validatePassword, setValidatePassword] = useState({
    password: false,
    newPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onElementChanged = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [target.name]: target.value });
    if (Object.keys(validatePassword).includes(target.name)) {
      setValidatePassword({
        ...validatePassword,
        [target.name]: validate_password(target.value),
      });
    }
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      thunkChangePassword({
        newPassword: formValues.password,
        token: token || "",
      })
    )
      .unwrap()
      .then(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: "success",
            description: "Contraseña restablecida",
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
    <div className="change-password">
      <div className="change-password-content">
        <div className="change-password-content-card">
          <h3 className="text-center">Recuperación de contraseña</h3>
          <form className="change-password-form" onSubmit={formSubmit}>
            <div className="form-group">
              <Label labelText="Nueva contraseña * " />
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
                onChange={onElementChanged}
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
            <div className="form-group">
              <Label labelText="Repita contraseña * " />
              <FontAwesomeIcon
                icon={showPasswordConfirm ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
              <Input
                required
                type={showPasswordConfirm ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formValues.newPassword}
                onChange={onElementChanged}
              />
              {validatePassword.newPassword && (
                <span className="form-error-message">
                  Por favor ingrese una contraseña válida
                </span>
              )}
            </div>
            {validatePassword.password && (
              <span className="form-error-message">
                Por favor ingrese una contraseña válida
              </span>
            )}
            {formValues.password !== formValues.newPassword &&
              !validatePassword.password && (
                <span className="form-error-message">
                  Las constraseñas no coinciden
                </span>
              )}
            <div className="change-password-actions">
              <Button
                type="submit"
                title="Enviar"
                format="primary"
                disabled={
                  validatePassword.password ||
                  formValues.password === "" ||
                  validatePassword.newPassword ||
                  formValues.newPassword === "" ||
                  formValues.password != formValues.newPassword
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
