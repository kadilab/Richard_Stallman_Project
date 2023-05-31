import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LigneCommandeFournisseur from './ligne-commande-fournisseur';
import LigneCommandeFournisseurDetail from './ligne-commande-fournisseur-detail';
import LigneCommandeFournisseurUpdate from './ligne-commande-fournisseur-update';
import LigneCommandeFournisseurDeleteDialog from './ligne-commande-fournisseur-delete-dialog';

const LigneCommandeFournisseurRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LigneCommandeFournisseur />} />
    <Route path="new" element={<LigneCommandeFournisseurUpdate />} />
    <Route path=":id">
      <Route index element={<LigneCommandeFournisseurDetail />} />
      <Route path="edit" element={<LigneCommandeFournisseurUpdate />} />
      <Route path="delete" element={<LigneCommandeFournisseurDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LigneCommandeFournisseurRoutes;
