import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './adresse.reducer';

export const AdresseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const adresseEntity = useAppSelector(state => state.adresse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="adresseDetailsHeading">
          <Translate contentKey="gestionCommerceApp.adresse.detail.title">Adresse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.id}</dd>
          <dt>
            <span id="numero">
              <Translate contentKey="gestionCommerceApp.adresse.numero">Numero</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.numero}</dd>
          <dt>
            <span id="rue">
              <Translate contentKey="gestionCommerceApp.adresse.rue">Rue</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.rue}</dd>
          <dt>
            <span id="commune">
              <Translate contentKey="gestionCommerceApp.adresse.commune">Commune</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.commune}</dd>
          <dt>
            <span id="ville">
              <Translate contentKey="gestionCommerceApp.adresse.ville">Ville</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.ville}</dd>
          <dt>
            <span id="pays">
              <Translate contentKey="gestionCommerceApp.adresse.pays">Pays</Translate>
            </span>
          </dt>
          <dd>{adresseEntity.pays}</dd>
        </dl>
        <Button tag={Link} to="/adresse" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/adresse/${adresseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AdresseDetail;
