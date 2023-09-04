import "./register.scss";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input, Label, Loader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { thunkRegisterUser } from "@/store/auth/thunks";
import { thunkShowToast } from "@/store/toast/thunks";
import {
  validate_email,
  validate_letters_and_numbers,
  validate_only_letters,
  validate_password,
  validate_phone_number,
} from "@/utils";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { creatingUser } = useAppSelector((store) => store.user);

  const [validateName, setValidateName] = useState({
    firstName: false,
    message: "",
  });

  const [validateLastName, setValidateLastName] = useState({
    lastName: false,
    message: "",
  });

  const [validateEmail, setValidateEmail] = useState({
    email: false,
    message: "",
  });

  const [validateApartmentNumber, setValidateApartmentNumber] = useState({
    apartmentNumber: false,
    message: "",
  });

  const [validateAddress, setValidateAddress] = useState({
    address: false,
    message: "",
  });

  const [validatePassword, setValidatePassword] = useState({
    password: false,
  });

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    apartmentNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onElementChanged = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [target.name]: target.value });

    if (Object.keys(validateName).includes(target.name)) {
      setValidateName({
        message: validate_only_letters(target.value),
        firstName: validate_only_letters(target.value) === "" ? false : true,
      });
    } else if (Object.keys(validateLastName).includes(target.name)) {
      setValidateLastName({
        message: validate_only_letters(target.value),
        lastName: validate_only_letters(target.value) === "" ? false : true,
      });
    } else if (Object.keys(validateApartmentNumber).includes(target.name)) {
      setValidateApartmentNumber({
        message: validate_phone_number(target.value),
        apartmentNumber:
          validate_phone_number(target.value) === "" ? false : true,
      });
    } else if (Object.keys(validateEmail).includes(target.name)) {
      setValidateEmail({
        message: validate_email(target.value),
        email: validate_email(target.value) === "" ? false : true,
      });
    } else if (Object.keys(validateAddress).includes(target.name)) {
      setValidateAddress({
        message: validate_letters_and_numbers(target.value, 150, 10),
        address:
          validate_letters_and_numbers(target.value, 150, 10) === ""
            ? false
            : true,
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
      formValues.firstName === "" ||
      formValues.lastName === "" ||
      formValues.email === "" ||
      formValues.password == "" ||
      formValues.confirmPassword === "" ||
      formValues.password !== formValues.confirmPassword ||
      validateName.firstName ||
      validateLastName.lastName ||
      validateEmail.email ||
      validateApartmentNumber.apartmentNumber ||
      validatePassword.password ||
      validateAddress.address
    )
      return true;
    else return false;
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(thunkRegisterUser({ user: { ...formValues } }))
      .unwrap()
      .catch(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: "failed",
            description:
              "Ha ocurrido un error al intentar registrar el usuario",
          })
        );
      });
  };

  return (
    <div className="register">
      {creatingUser ? (
        <Loader>
          <span>Creando registro...</span>
        </Loader>
      ) : (
        <div className="register-content">
          <h3 className="text-center">Registro</h3>
          <form className="register-form" onSubmit={formSubmit}>
            <div className="form-group">
              <Label labelText="Nombre *" />
              <Input
                required
                id="firstName"
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={onElementChanged}
              />
              {validateName.firstName && (
                <span className="form-error-message">
                  {validateName.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Label labelText="Apellido *" />
              <Input
                required
                id="lastName"
                name="lastName"
                value={formValues.lastName}
                onChange={onElementChanged}
              />
              {validateLastName.lastName && (
                <span className="form-error-message">
                  {validateLastName.message}
                </span>
              )}
            </div>
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
            <div className="form-group">
              <Label labelText="Número de apartamento *" />
              <Input
                required
                id="apartmentNumber"
                name="apartmentNumber"
                value={formValues.apartmentNumber}
                onChange={onElementChanged}
              />
              {validateApartmentNumber.apartmentNumber && (
                <span className="form-error-message">
                  {validateApartmentNumber.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <Label labelText="Contraseña * " />
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
              <Label labelText="Confirmar contraseña * " />
              <FontAwesomeIcon
                icon={showPasswordConfirm ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
              <Input
                required
                type={showPasswordConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={onElementChanged}
              />
              {formValues.password !== formValues.confirmPassword && (
                <span className="form-error-message">
                  Las contraseñas no coinciden
                </span>
              )}
            </div>
            <div className="register-actions">
              <Button
                type="submit"
                title="Registrarme"
                format="primary"
                disabled={buttonDisabled()}
              />
            </div>
            <p
              role="presentation"
              className="text-center text-link"
              onClick={() => navigate("/login")}
            >
              ¿Ya tienes una cuenta?
            </p>
          </form>
        </div>
      )}
    </div>
  );
};
