import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSimulation } from './actions';

function CalculTaxeDedouanement() {
  // Déclaration des états locaux pour stocker les valeurs des champs du formulaire
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [dateMiseCirculation, setDateMiseCirculation] = useState('');
  const [valeurNeuf, setValeurNeuf] = useState('');
  const [resultats, setResultats] = useState(null); // État local pour stocker les résultats

  const dispatch = useDispatch();

  // Calcul des taxes
  const calculerTaxes = () => {
    // Vérifier si toutes les données nécessaires sont fournies
    if (!marque || !modele || !dateMiseCirculation || !valeurNeuf) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Calcul de la valeur taxable en fonction de l'âge du véhicule
    const ageVehicule = new Date().getFullYear() - new Date(dateMiseCirculation).getFullYear();
    let tauxReduction = 1;

    if (ageVehicule < 1) {
      tauxReduction = 1;
    } else if (ageVehicule >= 1 && ageVehicule < 2) {
      tauxReduction = 0.9;
    } else if (ageVehicule >= 2 && ageVehicule < 3) {
      tauxReduction = 0.8;
    } else {
      tauxReduction = 0.75;
    }

    const valeurTaxableCalculee = valeurNeuf * tauxReduction;

    // Calcul des droits et taxes
    const droitImportationCalcule = valeurTaxableCalculee * 0.175;
    const tvaCalcule = valeurTaxableCalculee * 0.2;
    const taxeParafiscaleCalculee = valeurTaxableCalculee * 0.0025;
    const montantTotalCalcule = droitImportationCalcule + tvaCalcule + taxeParafiscaleCalculee;

    // Mise à jour de l'état local avec les résultats
    setResultats({
      droitImportation: droitImportationCalcule,
      tva: tvaCalcule,
      taxeParafiscale: taxeParafiscaleCalculee,
      montantTotal: montantTotalCalcule
    });

    // Sauvegarde dans le store Redux
    dispatch(addSimulation({
      marque,
      modele,
      dateMiseCirculation,
      valeurNeuf,
      valeurTaxable: valeurTaxableCalculee,
      montant: montantTotalCalcule
    }));
  };

  return (
    <div className="container">
      <h2 className="mt-5">Calcul des taxes de dédouanement</h2>
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label>Marque du véhicule:</label>
              <input type="text" className="form-control" value={marque} onChange={(e) => setMarque(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Modèle du véhicule:</label>
              <input type="text" className="form-control" value={modele} onChange={(e) => setModele(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Date de 1ère mise en circulation:</label>
              <input type="date" className="form-control" value={dateMiseCirculation} onChange={(e) => setDateMiseCirculation(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Valeur à l'état neuf:</label>
              <input type="number" className="form-control" value={valeurNeuf} onChange={(e) => setValeurNeuf(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={calculerTaxes}>Valider</button>
          </form>
        </div>
        <div className="col-md-6">
          {resultats && (
            <div>
              <h3>Résultats :</h3>
              <p>Droit d'importation : {resultats.droitImportation}</p>
              <p>TVA : {resultats.tva}</p>
              <p>Taxe parafiscale : {resultats.taxeParafiscale}</p>
              <p>Montant total : {resultats.montantTotal}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalculTaxeDedouanement;
