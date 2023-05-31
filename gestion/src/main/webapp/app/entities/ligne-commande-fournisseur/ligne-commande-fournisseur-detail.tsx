import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ligne-commande-fournisseur.reducer';

export const LigneCommandeFournisseurDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ligneCommandeFournisseurEntity = useAppSelector(state => state.ligneCommandeFournisseur.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ligneCommandeFournisseurDetailsHeading">
          <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.detail.title">LigneCommandeFournisseur</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ligneCommandeFournisseurEntity.id}</dd>
          <dt>
            <span id="quantite">
              <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{ligneCommandeFournisseurEntity.quantite}</dd>
          <dt>
            <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.produit">Produit</Translate>
          </dt>
          <dd>{ligneCommandeFournisseurEntity.produit ? ligneCommandeFournisseurEntity.produit.id : ''}</dd>
          <dt>
            <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.commandeFournisseur">Commande Fournisseur</Translate>
          </dt>
          <dd>{ligneCommandeFournisseurEntity.commandeFournisseur ? ligneCommandeFournisseurEntity.commandeFournisseur.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ligne-commande-fournisseur" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ligne-commande-fournisseur/${ligneCommandeFournisseurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LigneCommandeFournisseurDetail;
