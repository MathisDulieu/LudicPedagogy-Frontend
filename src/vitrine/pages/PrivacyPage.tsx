export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-300 prose prose-invert prose-sm">
            <h1 className="text-4xl font-bold text-white mb-2">
                Politique de confidentialité
            </h1>
            <p className="text-slate-500 text-sm mb-10">
                Dernière mise à jour : 22 février 2026
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    1. Responsable du traitement
                </h2>
                <p>
                    Le responsable du traitement des données personnelles est{" "}
                    <strong>LudicPedagogy SAS</strong>, 42 rue de l'Innovation,
                    75001 Paris. Pour toute question relative à vos données
                    personnelles, contactez-nous à{" "}
                    <a
                        href="mailto:privacy@ludicpedagogy.fr"
                        className="text-primary-400 hover:underline"
                    >
                        privacy@ludicpedagogy.fr
                    </a>
                    .
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    2. Données collectées
                </h2>
                <p>Nous collectons les données suivantes :</p>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                    <li>
                        <strong>Données d'identification :</strong> nom, prénom,
                        adresse email;
                    </li>
                    <li>
                        <strong>Données d'organisation :</strong> nom de
                        l'établissement, type;
                    </li>
                    <li>
                        <strong>Données de connexion :</strong> adresse IP,
                        navigateur, date/heure de connexion;
                    </li>
                    <li>
                        <strong>Données d'usage :</strong> pages visitées, temps
                        passé, progression dans les cours;
                    </li>
                    <li>
                        <strong>Données de paiement :</strong> traitées
                        directement par Stripe, nous ne stockons pas vos
                        coordonnées bancaires.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    3. Finalités du traitement
                </h2>
                <p>Vos données sont utilisées pour :</p>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                    <li>Fournir et améliorer le service LudicPedagogy;</li>
                    <li>Gérer votre compte et votre abonnement;</li>
                    <li>
                        Envoyer des communications relatives au service (pas de
                        marketing sans consentement);
                    </li>
                    <li>
                        Assurer la sécurité et l'intégrité de la plateforme;
                    </li>
                    <li>Respecter nos obligations légales.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    4. Base légale
                </h2>
                <p>
                    Le traitement de vos données repose sur : l'exécution du
                    contrat (traitement du compte et de l'abonnement), le
                    consentement (communications marketing), et les intérêts
                    légitimes de LudicPedagogy (amélioration du service,
                    sécurité).
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    5. Durée de conservation
                </h2>
                <p>
                    Vos données sont conservées pendant toute la durée de votre
                    abonnement, puis pendant une durée de 3 ans à compter de la
                    résiliation, sauf obligation légale contraire.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    6. Partage des données
                </h2>
                <p>
                    Vos données ne sont pas vendues à des tiers. Elles peuvent
                    être partagées avec nos sous-traitants techniques
                    (hébergement, paiement) dans le cadre strict de la
                    fourniture du service, tous conformes au RGPD.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">
                    7. Vos droits
                </h2>
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                    <li>
                        <strong>Droit d'accès :</strong> obtenir une copie de
                        vos données;
                    </li>
                    <li>
                        <strong>Droit de rectification :</strong> corriger des
                        données inexactes;
                    </li>
                    <li>
                        <strong>Droit à l'effacement :</strong> supprimer vos
                        données ("droit à l'oubli");
                    </li>
                    <li>
                        <strong>Droit à la portabilité :</strong> recevoir vos
                        données dans un format structuré;
                    </li>
                    <li>
                        <strong>Droit d'opposition :</strong> s'opposer à un
                        traitement basé sur nos intérêts légitimes.
                    </li>
                </ul>
                <p className="mt-3">
                    Pour exercer vos droits, contactez{" "}
                    <a
                        href="mailto:privacy@ludicpedagogy.fr"
                        className="text-primary-400 hover:underline"
                    >
                        privacy@ludicpedagogy.fr
                    </a>
                    . Vous avez également le droit d'introduire une réclamation
                    auprès de la CNIL (
                    <a
                        href="https://www.cnil.fr"
                        target="_blank"
                        className="text-primary-400 hover:underline"
                    >
                        www.cnil.fr
                    </a>
                    ).
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold text-white">8. Cookies</h2>
                <p>
                    Nous utilisons des cookies techniques nécessaires au
                    fonctionnement du service et des cookies analytiques (avec
                    votre consentement) pour améliorer l'expérience utilisateur.
                    Vous pouvez gérer vos préférences de cookies depuis votre
                    navigateur.
                </p>
            </section>
        </div>
    );
}
