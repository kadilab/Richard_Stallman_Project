import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAdresse } from 'app/shared/model/adresse.model';
import { getEntity, updateEntity, createEntity, reset } from './adresse.reducer';

export const AdresseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const adresseEntity = useAppSelector(state => state.adresse.entity);
  const loading = useAppSelector(state => state.adresse.loading);
  const updating = useAppSelector(state => state.adresse.updating);
  const updateSuccess = useAppSelector(state => state.adresse.updateSuccess);

  const handleClose = () => {
    navigate('/adresse' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...adresseEntity,
      ...values,
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
          ...adresseEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionCommerceApp.adresse.home.createOrEditLabel" data-cy="AdresseCreateUpdateHeading">
            <Translate contentKey="gestionCommerceApp.adresse.home.createOrEditLabel">Create or edit a Adresse</Translate>
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
                  id="adresse-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gestionCommerceApp.adresse.numero')}
                id="adresse-numero"
                name="numero"
                data-cy="numero"
                type="text"
              />
              <ValidatedField label={translate('gestionCommerceApp.adresse.rue')} id="adresse-rue" name="rue" data-cy="rue" type="text" />
              <ValidatedField
                label={translate('gestionCommerceApp.adresse.commune')}
                id="adresse-commune"
                name="commune"
                data-cy="commune"
                type="text"
              />
              <ValidatedField
                label={translate('gestionCommerceApp.adresse.ville')}
                id="adresse-ville"
                name="ville"
                data-cy="ville"
                type="text"
              />
              <ValidatedField
                label={translate('gestionCommerceApp.adresse.pays')}
                id="adresse-pays"
                name="pays"
                data-cy="pays"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/adresse" replace color="info">
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

export default AdresseUpdate;
