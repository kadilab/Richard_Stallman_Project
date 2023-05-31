import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAdresse } from 'app/shared/model/adresse.model';
import { getEntities as getAdresses } from 'app/entities/adresse/adresse.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntity, updateEntity, createEntity, reset } from './fournisseur.reducer';

export const FournisseurUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const adresses = useAppSelector(state => state.adresse.entities);
  const fournisseurEntity = useAppSelector(state => state.fournisseur.entity);
  const loading = useAppSelector(state => state.fournisseur.loading);
  const updating = useAppSelector(state => state.fournisseur.updating);
  const updateSuccess = useAppSelector(state => state.fournisseur.updateSuccess);

  const handleClose = () => {
    navigate('/fournisseur' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAdresses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...fournisseurEntity,
      ...values,
      adresse: adresses.find(it => it.id.toString() === values.adresse.toString()),
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
          ...fournisseurEntity,
          adresse: fournisseurEntity?.adresse?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionCommerceApp.fournisseur.home.createOrEditLabel" data-cy="FournisseurCreateUpdateHeading">
            <Translate contentKey="gestionCommerceApp.fournisseur.home.createOrEditLabel">Create or edit a Fournisseur</Translate>
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
                  id="fournisseur-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gestionCommerceApp.fournisseur.nom')}
                id="fournisseur-nom"
                name="nom"
                data-cy="nom"
                type="text"
              />
              <ValidatedField
                label={translate('gestionCommerceApp.fournisseur.email')}
                id="fournisseur-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('gestionCommerceApp.fournisseur.telephone')}
                id="fournisseur-telephone"
                name="telephone"
                data-cy="telephone"
                type="text"
              />
              <ValidatedField
                id="fournisseur-adresse"
                name="adresse"
                data-cy="adresse"
                label={translate('gestionCommerceApp.fournisseur.adresse')}
                type="select"
              >
                <option value="" key="0" />
                {adresses
                  ? adresses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/fournisseur" replace color="info">
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

export default FournisseurUpdate;
