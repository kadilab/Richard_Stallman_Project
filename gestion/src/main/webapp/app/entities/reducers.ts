import utilisateur from 'app/entities/utilisateur/utilisateur.reducer';
import client from 'app/entities/client/client.reducer';
import adresse from 'app/entities/adresse/adresse.reducer';
import commandeFournisseur from 'app/entities/commande-fournisseur/commande-fournisseur.reducer';
import ligneCommandeFournisseur from 'app/entities/ligne-commande-fournisseur/ligne-commande-fournisseur.reducer';
import produit from 'app/entities/produit/produit.reducer';
import categorie from 'app/entities/categorie/categorie.reducer';
import commande from 'app/entities/commande/commande.reducer';
import produitCommande from 'app/entities/produit-commande/produit-commande.reducer';
import fournisseur from 'app/entities/fournisseur/fournisseur.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  utilisateur,
  client,
  adresse,
  commandeFournisseur,
  ligneCommandeFournisseur,
  produit,
  categorie,
  commande,
  produitCommande,
  fournisseur,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
