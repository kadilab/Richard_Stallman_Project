import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { ICommandeFournisseur } from 'app/shared/model/commande-fournisseur.model';
import { getEntity, updateEntity, createEntity, reset } from './commande-fournisseur.reducer';

export const CommandeFournisseurUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const fournisseurs = useAppSelector(state => state.fournisseur.entities);
  const commandeFournisseurEntity = useAppSelector(state => state.commandeFournisseur.entity);
  const loading = useAppSelector(state => state.commandeFournisseur.loading);
  const updating = useAppSelector(state => state.commandeFournisseur.updating);
  const updateSuccess = useAppSelector(state => state.commandeFournisseur.updateSuccess);

  const handleClose = () => {
    navigate('/commande-fournisseur' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getFournisseurs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dateDebut = convertDateTimeToServer(values.dateDebut);
    values.dateFin = convertDateTimeToServer(values.dateFin);

    const entity = {
      ...commandeFournisseurEntity,
      ...values,
      fournisseur: fournisseurs.find(it => it.id.toString() === values.fournisseur.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          dateDebut: displayDefaultDateTime(),
          dateFin: displayDefaultDateTime(),
        }
      : {
          ...commandeFournisseurEntity,
          dateDebut: convertDateTimeFromServer(commandeFournisseurEntity.dateDebut),
          dateFin: convertDateTimeFromServer(commandeFournisseurEntity.dateFin),
          fournisseur: commandeFournisseurEntity?.fournisseur?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionCommerceApp.commandeFournisseur.home.createOrEditLabel" data-cy="CommandeFournisseurCreateUpdateHeading">
            <Translate contentKey="gestionCommerceApp.commandeFournisseur.home.createOrEditLabel">
              Create or edit a CommandeFournisseur
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
                  id="commande-fournisseur-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gestionCommerceApp.commandeFournisseur.numero')}
                id="commande-fournisseur-numero"
                name="numero"
                data-cy="numero"
                type="text"
              />
              <ValidatedField
                label={translate('gestionCommerceApp.commandeFournisseur.dateDebut')}
                id="commande-fournisseur-dateDebut"
                name="dateDebut"
                data-cy="dateDebut"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('gestionCommerceApp.commandeFournisseur.dateFin')}
                id="commande-fournisseur-dateFin"
                name="dateFin"
                data-cy="dateFin"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('gestionCommerceApp.commandeFournisseur.statut')}
                id="commande-fournisseur-statut"
                name="statut"
                data-cy="statut"
                type="text"
              />
              <ValidatedField
                id="commande-fournisseur-fournisseur"
                name="fournisseur"
                data-cy="fournisseur"
                label={translate('gestionCommerceApp.commandeFournisseur.fournisseur')}
                type="select"
              >
                <option value="" key="0" />
                {fournisseurs
                  ? fournisseurs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/commande-fournisseur" replace color="info">
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

export default CommandeFournisseurUpdate;
