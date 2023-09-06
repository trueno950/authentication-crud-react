import "./invitations.scss";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { useCallback, useEffect, useState } from "react";

import { Button, Loader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { thunkShowToast } from "@/store/toast/thunks";
import {
  thunkCreateInvitation,
  thunkGetInvitation,
  thunkUpdateInvitation,
} from "@/store/invitation/thunks";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

interface Props {
  invitationId: string | undefined;
  type: string;
  closeModal: () => void;
  isWrite?: boolean;
}
export const InvitationPage = ({
  invitationId,
  type,
  closeModal,
  isWrite,
}: Props) => {
  const dispatch = useAppDispatch();
  const { invitation, loadingInvitation } = useAppSelector(
    (store) => store.invitation
  );

  const { user } = useAppSelector((store) => store.user);

  const [formValues, setFormValues] = useState<{
    guestName: string;
    entryDate: Dayjs;
    expirationDate: Dayjs;
    createdAt: Dayjs;
  }>({
    guestName: "",
    entryDate: dayjs(new Date()),
    expirationDate: dayjs(new Date()),
    createdAt: dayjs(new Date()),
  });

  const onInputChanged = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleDateChange = (date: Dayjs | null, field: string) => {
    if (field === "entryDate" && date) {
      setFormValues({ ...formValues, entryDate: dayjs(date) });
      if (
        formValues.expirationDate &&
        date.isAfter(formValues.expirationDate)
      ) {
        setFormValues({ ...formValues, expirationDate: dayjs(date) });
      }
    } else if (field === "expirationDate" && date) {
      if (!formValues.entryDate || date.isAfter(formValues.entryDate)) {
        setFormValues({ ...formValues, expirationDate: dayjs(date) });
      }
    }
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyInvitation = {
      guestName: formValues.guestName,
      entryDate: formValues.entryDate.utc().format("YYYY-MM-DD HH:mm:ss"),
      expirationDate: formValues.expirationDate
        .utc()
        .format("YYYY-MM-DD HH:mm:ss"),
      userId: user?.id || "",
    };

    if (type === "new") {
      dispatch(thunkCreateInvitation({ invitation: bodyInvitation }))
        .unwrap()
        .then(() => {
          dispatch(
            thunkShowToast({
              show: true,
              type: "success",
              description: "Usuario creado con éxito",
            })
          );
          closeModal();
        })
        .catch(() => {
          dispatch(
            thunkShowToast({
              show: true,
              type: "failed",
              description:
                "Ha ocurrido un error al intentar guardar la información",
            })
          );
          closeModal();
        });
    } else {
      dispatch(
        thunkUpdateInvitation({
          invitation: bodyInvitation,
          invitationId: invitationId || "",
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            thunkShowToast({
              show: true,
              type: "success",
              description: "Usuario actualizado con éxito",
            })
          );
          closeModal();
        })
        .catch(() => {
          dispatch(
            thunkShowToast({
              show: true,
              type: "failed",
              description:
                "Ha ocurrido un error al intentar actualizar la información",
            })
          );
          closeModal();
        });
    }
  };

  const get_info_invitation = useCallback(() => {
    if (invitationId) {
      dispatch(thunkGetInvitation({ invitationId })).catch(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: "failed",
            description:
              "Ha ocurrido un error al obtener la información de la invitación",
          })
        );
      });
    }
  }, [invitationId, dispatch]);

  useEffect(() => {
    get_info_invitation();
  }, [get_info_invitation]);

  useEffect(() => {
    if (!invitation || type == "new") {
      return;
    }
    setFormValues({
      ...invitation,
      entryDate: dayjs(invitation.entryDate),
      expirationDate: dayjs(invitation.expirationDate),
      createdAt: dayjs(invitation.createdAt),
    });
  }, [invitation]);

  return (
    <>
      {loadingInvitation && (
        <Loader>Espere por favor, procesando información...</Loader>
      )}
      {!loadingInvitation && (
        <div className="invitations content-height">
          <header className="invitations-header-details">
            <h2>
              {type === "new" ? "Nueva invitación" : "Datos de la invitación"}
            </h2>
          </header>
          <div className="invitations-content-details">
            <form className="form" onSubmit={formSubmit}>
              <div className="form-name">
                <TextField
                  required
                  id="guestName"
                  name="guestName"
                  value={formValues.guestName}
                  onChange={onInputChanged}
                  disabled={!isWrite}
                  label="Nombre del invitado:"
                />
              </div>
              <div
                className={`form-dates ${type === "new" && "form-dates-new"}`}
              >
                <div className="form-group">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      format="DD/MM/YYYY hh:mm a"
                      label="Fecha de entrada:"
                      value={formValues.entryDate}
                      disabled={!isWrite}
                      onChange={(date) => handleDateChange(date, "entryDate")}
                    />
                  </LocalizationProvider>
                </div>
                <div className="form-group">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      format="DD/MM/YYYY hh:mm a"
                      label="Fecha de expiración:"
                      value={formValues.expirationDate}
                      disabled={!isWrite}
                      onChange={(date) =>
                        handleDateChange(date, "expirationDate")
                      }
                    />
                  </LocalizationProvider>
                </div>
                {type != "new" && (
                  <div className="form-group">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        format="DD/MM/YYYY hh:mm a"
                        label="Fecha de creación:"
                        value={formValues.createdAt}
                        disabled={!isWrite}
                        onChange={(date) => handleDateChange(date, "createdAt")}
                      />
                    </LocalizationProvider>
                  </div>
                )}
              </div>
              {type != "view" && (
                <div className="form-action">
                  <Button
                    title={
                      type == "new" ? "Guardar invitación" : "Editar invitación"
                    }
                    disabled={formValues.guestName === ""}
                    format="primary"
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
