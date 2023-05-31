import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Utilisateur from './utilisateur';
import Client from './client';
import Adresse from './adresse';
import CommandeFournisseur from './commande-fournisseur';
import LigneCommandeFournisseur from './ligne-commande-fournisseur';
import Produit from './produit';
import Categorie from './categorie';
import Commande from './commande';
import ProduitCommande from './produit-commande';
import Fournisseur from './fournisseur';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="utilisateur/*" element={<Utilisateur />} />
        <Route path="client/*" element={<Client />} />
        <Route path="adresse/*" element={<Adresse />} />
        <Route path="commande-fournisseur/*" element={<CommandeFournisseur />} />
        <Route path="ligne-commande-fournisseur/*" element={<LigneCommandeFournisseur />} />
        <Route path="produit/*" element={<Produit />} />
        <Route path="categorie/*" element={<Categorie />} />
        <Route path="commande/*" element={<Commande />} />
        <Route path="produit-commande/*" element={<ProduitCommande />} />
        <Route path="fournisseur/*" element={<Fournisseur />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
