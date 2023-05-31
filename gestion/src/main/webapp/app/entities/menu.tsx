import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/utilisateur">
        <Translate contentKey="global.menu.entities.utilisateur" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/client">
        <Translate contentKey="global.menu.entities.client" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/adresse">
        <Translate contentKey="global.menu.entities.adresse" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/commande-fournisseur">
        <Translate contentKey="global.menu.entities.commandeFournisseur" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ligne-commande-fournisseur">
        <Translate contentKey="global.menu.entities.ligneCommandeFournisseur" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/produit">
        <Translate contentKey="global.menu.entities.produit" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/categorie">
        <Translate contentKey="global.menu.entities.categorie" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/commande">
        <Translate contentKey="global.menu.entities.commande" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/produit-commande">
        <Translate contentKey="global.menu.entities.produitCommande" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/fournisseur">
        <Translate contentKey="global.menu.entities.fournisseur" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
