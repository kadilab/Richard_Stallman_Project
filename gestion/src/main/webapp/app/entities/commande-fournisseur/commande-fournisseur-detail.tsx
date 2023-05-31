import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './commande-fournisseur.reducer';

export const CommandeFournisseurDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const commandeFournisseurEntity = useAppSelector(state => state.commandeFournisseur.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commandeFournisseurDetailsHeading">
          <Translate contentKey="gestionCommerceApp.commandeFournisseur.detail.title">CommandeFournisseur</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{commandeFournisseurEntity.id}</dd>
          <dt>
            <span id="numero">
              <Translate contentKey="gestionCommerceApp.commandeFournisseur.numero">Numero</Translate>
            </span>
          </dt>
          <dd>{commandeFournisseurEntity.numero}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="gestionCommerceApp.commandeFournisseur.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            {commandeFournisseurEntity.dateDebut ? (
              <TextFormat value={commandeFournisseurEntity.dateDebut} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="gestionCommerceApp.commandeFournisseur.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            {commandeFournisseurEntity.dateFin ? (
              <TextFormat value={commandeFournisseurEntity.dateFin} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="statut">
              <Translate contentKey="gestionCommerceApp.commandeFournisseur.statut">Statut</Translate>
            </span>
          </dt>
          <dd>{commandeFournisseurEntity.statut}</dd>
          <dt>
            <Translate contentKey="gestionCommerceApp.commandeFournisseur.fournisseur">Fournisseur</Translate>
          </dt>
          <dd>{commandeFournisseurEntity.fournisseur ? commandeFournisseurEntity.fournisseur.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/commande-fournisseur" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/commande-fournisseur/${commandeFournisseurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommandeFournisseurDetail;
