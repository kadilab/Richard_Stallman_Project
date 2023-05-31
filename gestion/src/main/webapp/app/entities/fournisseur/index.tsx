import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Fournisseur from './fournisseur';
import FournisseurDetail from './fournisseur-detail';
import FournisseurUpdate from './fournisseur-update';
import FournisseurDeleteDialog from './fournisseur-delete-dialog';

const FournisseurRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Fournisseur />} />
    <Route path="new" element={<FournisseurUpdate />} />
    <Route path=":id">
      <Route index element={<FournisseurDetail />} />
      <Route path="edit" element={<FournisseurUpdate />} />
      <Route path="delete" element={<FournisseurDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FournisseurRoutes;
