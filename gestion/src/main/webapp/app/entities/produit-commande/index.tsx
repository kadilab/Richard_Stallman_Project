import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ProduitCommande from './produit-commande';
import ProduitCommandeDetail from './produit-commande-detail';
import ProduitCommandeUpdate from './produit-commande-update';
import ProduitCommandeDeleteDialog from './produit-commande-delete-dialog';

const ProduitCommandeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ProduitCommande />} />
    <Route path="new" element={<ProduitCommandeUpdate />} />
    <Route path=":id">
      <Route index element={<ProduitCommandeDetail />} />
      <Route path="edit" element={<ProduitCommandeUpdate />} />
      <Route path="delete" element={<ProduitCommandeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProduitCommandeRoutes;
