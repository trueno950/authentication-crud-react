import "./invitations.scss";

import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import QRCode from "react-qr-code";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  thunkDeleteInvitation,
  thunkGetInvitations,
} from "@/store/invitation/thunks";
import { thunkShowToast } from "@/store/toast/thunks";
import { debounce, formatDate, paginationComponentOptions } from "@/utils";

import { InvitationPage } from "./InvitationPage";
import { InvitationInterface } from "@/interfaces/Invitation";
import { XmarkIcon } from "@/assets/icons";
import { Button, InputSearch, Modal } from "@/components";

export const InvitationsPage = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((store) => store.user);
  const { loadingInvitations, invitations, totalItems } = useAppSelector(
    (store) => store.invitation
  );

  const [searchFilter, setSearchFilter] = useState<string>("");
  const [totalRows, setTotalRows] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [invitationId, setInvitationId] = useState<string | undefined>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [reloadTable, setReloadTable] = useState<boolean>(true);
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<InvitationInterface | null>(
    null
  );

  const columns: TableColumn<InvitationInterface>[] = [
    {
      name: "Nombre del invitado",
      selector: (row) => row.guestName,
      sortable: true,
    },
    {
      name: "Fecha de entrada",
      selector: (row) => formatDate(row.entryDate.toString()),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleClick(event, row)
            }
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Editar</MenuItem>
            <MenuItem onClick={handleGetQR}>Generar QR</MenuItem>
            <MenuItem onClick={handleMoreInfo}>Más Información</MenuItem>
            <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  const onSearchChanged = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const search = debounce((a: string) => {
      setCurrentPage(1);
      setSearchFilter(a);
    });
    search(target.value);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setCurrentPage(page);
    setPerPage(newPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNew = () => {
    setInvitationId("");
    setIsWrite(true);
    setType("new");
    setShowConfirm(true);
    setReloadTable(false);
  };

  const handleEdit = () => {
    setInvitationId(selectedRow?.id);
    setIsWrite(true);
    setType("edit");
    setShowConfirm(true);
    setReloadTable(false);
    handleClose();
  };

  const handleDelete = () => {
    setInvitationId(selectedRow?.id);
    setReloadTable(false);
    setShowDelete(true);
    handleClose();
  };

  const handleMoreInfo = () => {
    setInvitationId(selectedRow?.id);
    setIsWrite(false);
    setType("view");
    setShowConfirm(true);
    handleClose();
  };

  const handleGetQR = () => {
    setShowQrCode(true);
    setAnchorEl(null);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: InvitationInterface
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const closeModal = () => {
    setShowConfirm(false);
    setInvitationId("");
    setReloadTable(true);
  };

  const onDeleteInvitation = () => {
    setShowDelete(false);
    if (invitationId)
      dispatch(thunkDeleteInvitation({ invitationId }))
        .unwrap()
        .then(() => {
          dispatch(
            thunkShowToast({
              show: true,
              type: "success",
              description: "El usuario ha sido eliminado correctamente",
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
                "Ha ocurrido un error al intentar eliminar la invitación",
            })
          );
        });
  };

  useEffect(() => {
    if (!user?.id || !reloadTable) return;
    const userId = user?.id;
    const params = {
      page: currentPage,
      perPage: perPage,
      sort: "createdAt",
      order: "DESC",
      filter: "",
    };
    if (searchFilter) {
      params.filter = searchFilter;
    }
    dispatch(thunkGetInvitations({ userId, params }))
      .unwrap()
      .then(() => {
        setTotalRows(totalItems);
      })
      .catch(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: "failed",
            description: "Ha ocurrido un error al listar las invitaciones",
          })
        );
      });
  }, [
    dispatch,
    user,
    searchFilter,
    perPage,
    currentPage,
    totalItems,
    reloadTable,
  ]);

  return (
    <div className="invitations content-height">
      <header className="invitations-header">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/dashboard">
            Inicio
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/invitations"
            aria-current="page"
          >
            Invitaciones
          </Link>
        </Breadcrumbs>
      </header>
      <div className="invitations-content">
        <div className="invitations-actions">
          <InputSearch
            positionIconSearch="left"
            placeholder="Buscar por el nombre de invitado"
            id="searchCode"
            name="searchCode"
            onChange={onSearchChanged}
          />
          <Button
            title="Nueva invitación"
            format="primary"
            size="small"
            id="new-invitation"
            onClick={() => {
              handleNew();
            }}
          />
        </div>
        {invitations && invitations.length > 0 && (
          <DataTable
            title="Listado de invitaciones"
            columns={columns}
            data={invitations ? invitations : []}
            progressPending={loadingInvitations}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            paginationComponentOptions={paginationComponentOptions}
          />
        )}
        {showConfirm && (
          <Modal
            elementTitle={
              <div className="modal-title">
                <XmarkIcon
                  className="modal-close-icon cursor-pointer"
                  width={15}
                  height={15}
                  onClick={() => setShowConfirm(false)}
                />
              </div>
            }
          >
            <div className="modal-body">
              <InvitationPage
                invitationId={invitationId}
                type={type}
                closeModal={closeModal}
                isWrite={isWrite}
              />
            </div>
          </Modal>
        )}
      </div>
      {showDelete && (
        <Modal
          elementTitle={
            <div className="modal-title">
              <b>Confirmación</b>
              <XmarkIcon
                className="modal-close-icon cursor-pointer"
                width={10}
                height={10}
                onClick={() => setShowDelete(false)}
              />
            </div>
          }
          elementFooter={
            <div className="modal-footer">
              <Button
                title="Si"
                format="primary"
                size="small"
                onClick={() => onDeleteInvitation()}
              ></Button>
              <Button
                title="No"
                format="outline"
                size="small"
                onClick={() => setShowDelete(false)}
              ></Button>
            </div>
          }
        >
          <div className="modal-body">
            <span>¿Estás seguro de eliminar la invitación?</span>
          </div>
        </Modal>
      )}
      {showQrCode && (
        <Modal
          elementTitle={
            <div className="modal-title">
              <b>Información de la invitación</b>
              <XmarkIcon
                className="modal-close-icon cursor-pointer"
                width={10}
                height={10}
                onClick={() => setShowQrCode(false)}
              />
            </div>
          }
        >
          <div className="modal-body">
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                width: "100%",
              }}
            >
              {selectedRow && (
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`Datos de la invitacion [Invitado: ${
                    selectedRow?.guestName
                  }, Fecha: ${formatDate(
                    selectedRow?.entryDate.toString()
                  )}, Fecha de caducidad: ${formatDate(
                    selectedRow?.expirationDate.toString()
                  )}]`}
                  viewBox={`0 0 256 256`}
                />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
