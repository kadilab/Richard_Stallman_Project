import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './fournisseur.reducer';

export const FournisseurDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fournisseurEntity = useAppSelector(state => state.fournisseur.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="fournisseurDetailsHeading">
          <Translate contentKey="gestionCommerceApp.fournisseur.detail.title">Fournisseur</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.id}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="gestionCommerceApp.fournisseur.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.nom}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="gestionCommerceApp.fournisseur.email">Email</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.email}</dd>
          <dt>
            <span id="telephone">
              <Translate contentKey="gestionCommerceApp.fournisseur.telephone">Telephone</Translate>
            </span>
          </dt>
          <dd>{fournisseurEntity.telephone}</dd>
          <dt>
            <Translate contentKey="gestionCommerceApp.fournisseur.adresse">Adresse</Translate>
          </dt>
          <dd>{fournisseurEntity.adresse ? fournisseurEntity.adresse.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/fournisseur" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/fournisseur/${fournisseurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default FournisseurDetail;
