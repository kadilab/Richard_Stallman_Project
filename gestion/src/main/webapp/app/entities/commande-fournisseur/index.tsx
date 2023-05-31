import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CommandeFournisseur from './commande-fournisseur';
import CommandeFournisseurDetail from './commande-fournisseur-detail';
import CommandeFournisseurUpdate from './commande-fournisseur-update';
import CommandeFournisseurDeleteDialog from './commande-fournisseur-delete-dialog';

const CommandeFournisseurRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CommandeFournisseur />} />
    <Route path="new" element={<CommandeFournisseurUpdate />} />
    <Route path=":id">
      <Route index element={<CommandeFournisseurDetail />} />
      <Route path="edit" element={<CommandeFournisseurUpdate />} />
      <Route path="delete" element={<CommandeFournisseurDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CommandeFournisseurRoutes;
