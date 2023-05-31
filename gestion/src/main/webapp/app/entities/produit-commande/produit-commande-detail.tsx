import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './produit-commande.reducer';

export const ProduitCommandeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const produitCommandeEntity = useAppSelector(state => state.produitCommande.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="produitCommandeDetailsHeading">
          <Translate contentKey="gestionCommerceApp.produitCommande.detail.title">ProduitCommande</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{produitCommandeEntity.id}</dd>
          <dt>
            <span id="quantite">
              <Translate contentKey="gestionCommerceApp.produitCommande.quantite">Quantite</Translate>
            </span>
          </dt>
          <dd>{produitCommandeEntity.quantite}</dd>
          <dt>
            <Translate contentKey="gestionCommerceApp.produitCommande.produit">Produit</Translate>
          </dt>
          <dd>{produitCommandeEntity.produit ? produitCommandeEntity.produit.id : ''}</dd>
          <dt>
            <Translate contentKey="gestionCommerceApp.produitCommande.commande">Commande</Translate>
          </dt>
          <dd>{produitCommandeEntity.commande ? produitCommandeEntity.commande.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/produit-commande" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/produit-commande/${produitCommandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProduitCommandeDetail;
