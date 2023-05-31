import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILigneCommandeFournisseur } from 'app/shared/model/ligne-commande-fournisseur.model';
import { getEntities } from './ligne-commande-fournisseur.reducer';

export const LigneCommandeFournisseur = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const ligneCommandeFournisseurList = useAppSelector(state => state.ligneCommandeFournisseur.entities);
  const loading = useAppSelector(state => state.ligneCommandeFournisseur.loading);
  const totalItems = useAppSelector(state => state.ligneCommandeFournisseur.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="ligne-commande-fournisseur-heading" data-cy="LigneCommandeFournisseurHeading">
        <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.home.title">Ligne Commande Fournisseurs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/ligne-commande-fournisseur/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.home.createLabel">
              Create new Ligne Commande Fournisseur
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ligneCommandeFournisseurList && ligneCommandeFournisseurList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('quantite')}>
                  <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.quantite">Quantite</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.produit">Produit</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.commandeFournisseur">Commande Fournisseur</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ligneCommandeFournisseurList.map((ligneCommandeFournisseur, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ligne-commande-fournisseur/${ligneCommandeFournisseur.id}`} color="link" size="sm">
                      {ligneCommandeFournisseur.id}
                    </Button>
                  </td>
                  <td>{ligneCommandeFournisseur.quantite}</td>
                  <td>
                    {ligneCommandeFournisseur.produit ? (
                      <Link to={`/produit/${ligneCommandeFournisseur.produit.id}`}>{ligneCommandeFournisseur.produit.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {ligneCommandeFournisseur.commandeFournisseur ? (
                      <Link to={`/commande-fournisseur/${ligneCommandeFournisseur.commandeFournisseur.id}`}>
                        {ligneCommandeFournisseur.commandeFournisseur.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/ligne-commande-fournisseur/${ligneCommandeFournisseur.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ligne-commande-fournisseur/${ligneCommandeFournisseur.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ligne-commande-fournisseur/${ligneCommandeFournisseur.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.home.notFound">
                No Ligne Commande Fournisseurs found
              </Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={ligneCommandeFournisseurList && ligneCommandeFournisseurList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default LigneCommandeFournisseur;
