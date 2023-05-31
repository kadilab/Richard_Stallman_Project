import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProduit } from 'app/shared/model/produit.model';
import { getEntities as getProduits } from 'app/entities/produit/produit.reducer';
import { ICommandeFournisseur } from 'app/shared/model/commande-fournisseur.model';
import { getEntities as getCommandeFournisseurs } from 'app/entities/commande-fournisseur/commande-fournisseur.reducer';
import { ILigneCommandeFournisseur } from 'app/shared/model/ligne-commande-fournisseur.model';
import { getEntity, updateEntity, createEntity, reset } from './ligne-commande-fournisseur.reducer';

export const LigneCommandeFournisseurUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const produits = useAppSelector(state => state.produit.entities);
  const commandeFournisseurs = useAppSelector(state => state.commandeFournisseur.entities);
  const ligneCommandeFournisseurEntity = useAppSelector(state => state.ligneCommandeFournisseur.entity);
  const loading = useAppSelector(state => state.ligneCommandeFournisseur.loading);
  const updating = useAppSelector(state => state.ligneCommandeFournisseur.updating);
  const updateSuccess = useAppSelector(state => state.ligneCommandeFournisseur.updateSuccess);

  const handleClose = () => {
    navigate('/ligne-commande-fournisseur' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProduits({}));
    dispatch(getCommandeFournisseurs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ligneCommandeFournisseurEntity,
      ...values,
      produit: produits.find(it => it.id.toString() === values.produit.toString()),
      commandeFournisseur: commandeFournisseurs.find(it => it.id.toString() === values.commandeFournisseur.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...ligneCommandeFournisseurEntity,
          produit: ligneCommandeFournisseurEntity?.produit?.id,
          commandeFournisseur: ligneCommandeFournisseurEntity?.commandeFournisseur?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionCommerceApp.ligneCommandeFournisseur.home.createOrEditLabel" data-cy="LigneCommandeFournisseurCreateUpdateHeading">
            <Translate contentKey="gestionCommerceApp.ligneCommandeFournisseur.home.createOrEditLabel">
              Create or edit a LigneCommandeFournisseur
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="ligne-commande-fournisseur-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gestionCommerceApp.ligneCommandeFournisseur.quantite')}
                id="ligne-commande-fournisseur-quantite"
                name="quantite"
                data-cy="quantite"
                type="text"
              />
              <ValidatedField
                id="ligne-commande-fournisseur-produit"
                name="produit"
                data-cy="produit"
                label={translate('gestionCommerceApp.ligneCommandeFournisseur.produit')}
                type="select"
              >
                <option value="" key="0" />
                {produits
                  ? produits.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="ligne-commande-fournisseur-commandeFournisseur"
                name="commandeFournisseur"
                data-cy="commandeFournisseur"
                label={translate('gestionCommerceApp.ligneCommandeFournisseur.commandeFournisseur')}
                type="select"
              >
                <option value="" key="0" />
                {commandeFournisseurs
                  ? commandeFournisseurs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ligne-commande-fournisseur" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LigneCommandeFournisseurUpdate;
