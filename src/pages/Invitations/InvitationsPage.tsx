import "./invitations.scss";

import { useEffect, useState } from "react";

import { XmarkIcon } from "@/assets/icons";
import {
  Button,
  Card,
  InputSearch,
  Loader,
  Modal,
  SortDirection,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { thunkGetInvitations } from "@/store/invitation/thunks";
import { thunkShowToast } from "@/store/toast/thunks";
import { debounce } from "@/utils";

import { InvitationPage } from "./InvitationPage";

export const InvitationsPage = () => {
  const [searchFilter, setSearchFilter] = useState({
    searchCode: "",
    searchShop: "",
    searchTotal: "",
    searchStatus: "",
    searchDate: {
      start: "",
      end: "",
    },
    order: "DESC",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [invitationId, setCouponId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((store) => store.user);
  const { loadingInvitations, invitations } = useAppSelector(
    (store) => store.invitation
  );

  const onSearchChanged = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const search = debounce((a: string) => {
      setCurrentPage(1);
      setSearchFilter({
        ...searchFilter,
        [target.name]: a,
      });
    });
    search(target.value);
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleDirectionChange = (direction: "ASC" | "DESC") => {
    setSearchFilter({
      ...searchFilter,
      order: direction,
    });
  };

  useEffect(() => {
    if (!user || !user.role || user.role == "") return;
    const userId = user.id
    const params = {
      page: 1,
      perPage: 10,
      sort: "createdAt",
      order: "ASC",
      filter: "",
    };
    dispatch(
      thunkGetInvitations({ userId, params })
    )
      .unwrap()
      .catch(() => {
        dispatch(
          thunkShowToast({
            show: true,
            type: "failed",
            description: "Ha ocurrido un error al listar las invitaciones",
          })
        );
      });
  }, [dispatch, user, currentPage, searchFilter]);

  useEffect(() => {
    if (startDate != null && endDate != null) {
      setSearchFilter({
        ...searchFilter,
        searchDate: {
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
        },
      });
    } else if (startDate == null && endDate == null) {
      setSearchFilter({
        ...searchFilter,
        searchDate: {
          start: "",
          end: "",
        },
      });
    }
  }, [startDate, endDate]);

  return (
    <div className="invitations content-height">
      <header className="invitations-header">
        <div className="invitations-header-items"></div>
      </header>
      <div className="invitations-content">
        <div className="invitations-actions">
          <InputSearch
            positionIconSearch="left"
            placeholder="Buscar por el código"
            id="searchCode"
            name="searchCode"
            onChange={onSearchChanged}
          />
          <InputSearch
            positionIconSearch="left"
            placeholder="Buscar por la tienda"
            id="searchShop"
            name="searchShop"
            onChange={onSearchChanged}
          />
          <InputSearch
            positionIconSearch="left"
            placeholder="Buscar por el total"
            id="searchTotal"
            name="searchTotal"
            onChange={onSearchChanged}
          />
          <SortDirection
            defaultDirection="DESC"
            labelAsc="Ordenar por fecha"
            labelDesc="Ordenar por fecha"
            onDirectionChange={handleDirectionChange}
          />
        </div>
        {loadingInvitations ? (
          <Loader>
            <span>Cargando invitaciones...</span>
          </Loader>
        ) : (
          <div className="cards-list">
            {invitations &&
              invitations.length > 0 &&
              invitations.map((invitation) => (
                <Card
                  key={invitation.id}
                  className="card-item invitations-card-item"
                >
                  <p>
                    <strong>Código: </strong>
                    {invitation.guestName}
                  </p>
                  <div className="invitations-card-actions">
                    <Button
                      format="primary"
                      title="Más info"
                      onClick={() => [
                        setShowConfirm(true),
                        setCouponId(invitation.id),
                      ]}
                    />
                  </div>
                </Card>
              ))}
          </div>
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
              <InvitationPage invitationId={invitationId} />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
