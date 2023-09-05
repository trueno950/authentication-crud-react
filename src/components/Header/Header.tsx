import "./header.scss";

import { useEffect, useState } from "react";
import { Button, Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/auth/thunks";
import { thunkGetUser } from "@/store/user/thunks";
import {
  RightFromBracketIcon,
  XmarkIcon,
} from "../../assets/icons";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);
  const { token_info } = useAppSelector((store) => store.auth);
  const [showConfirm, setShowConfirm] = useState(false);

  const onLogout = () => {
    setShowConfirm(false);
    dispatch(logout())
    navigate("/");
  };

  useEffect(() => {
    dispatch(thunkGetUser({ userId: String(token_info?.user?.id) }));
  }, [dispatch, token_info?.user?.id]);

  return (
    <header className="header">
      <div className="header-wrapper">
        <h3>Nextia Prueba</h3>
        {user?.firstName && (
          <div className="header-actions">
            <RightFromBracketIcon
              width={25}
              className="header-icons"
              onClick={() => setShowConfirm(true)}
            />
          </div>
        )}
      </div>
      {showConfirm && (
        <Modal
          elementTitle={
            <div className="modal-title">
              <b>Cerrar sesión</b>
              <XmarkIcon
                className="modal-close-icon cursor-pointer"
                width={10}
                height={10}
                onClick={() => setShowConfirm(false)}
              />
            </div>
          }
          elementFooter={
            <div className="modal-footer">
              <Button
                title="Cerrar sesión"
                format="primary"
                size="small"
                onClick={() => onLogout()}
              ></Button>
              <Button
                title="Cancelar"
                format="outline"
                size="small"
                onClick={() => setShowConfirm(false)}
              ></Button>
            </div>
          }
        >
          <div className="modal-body">
            <span>¿Estás seguro de que quieres cerrar sesión?</span>
          </div>
        </Modal>
      )}
    </header>
  );
};
