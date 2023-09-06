import "./invitations.scss";

import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { XmarkIcon } from "@/assets/icons";
import { Button, InputSearch, Modal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { thunkGetInvitations } from "@/store/invitation/thunks";
import { thunkShowToast } from "@/store/toast/thunks";
import { debounce } from "@/utils";

import { InvitationPage } from "./InvitationPage";
import { InvitationInterface } from "@/interfaces/Invitation";

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
  const [reloadTable, setReloadTable] = useState<boolean>(true);
  const [isWrite, setIsWrite] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<InvitationInterface | null>(
    null
  );

  const onSearchChanged = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const search = debounce((a: string) => {
      setCurrentPage(1);
      setSearchFilter(a);
    });
    search(target.value);
  };

  const columns: TableColumn<InvitationInterface>[] = [
    {
      name: "Nombre del invitado",
      selector: (row) => row.guestName,
      sortable: true,
    },
    {
      name: "Fecha de entrada",
      selector: (row) => row.entryDate.toString(),
      sortable: false,
    },
    {
      name: "Actions",
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
    setReloadTable(false);
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
        <div className="invitations-header-items"></div>
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
    </div>
  );
};
