import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./TrustLogos.module.scss";

type Client = PortfolioData["clients"][number];

export function TrustLogos({ clients }: { clients: Client[] }) {
  const logoClients = clients.filter((client) => client.showInLogos);
  const proofClient = clients.find((client) => "proofLabel" in client);
  const proofLabel = proofClient && "proofLabel" in proofClient ? proofClient.proofLabel : "";

  return (
    <div className={styles["trust-logos"]} aria-labelledby="trust-heading">
      <div className={styles["trust-logos__label"]} id="trust-heading">
        {proofLabel}
      </div>
      <div className={styles["trust-logos__list"]}>
        {logoClients.map((client) => (
          <LogoAsset key={client.name} client={client} />
        ))}
      </div>
    </div>
  );
}

function LogoAsset({ client }: { client: Client }) {
  return (
    <a
      className={`${styles["trust-logos__logo"]} ${"invert" in client && client.invert ? styles["trust-logos__logo--invert"] : ""}`}
      href={client.website}
      target="_blank"
      rel="noreferrer"
      aria-describedby={client.reviewId}
    >
      <img src={client.logo} alt={client.name} loading="lazy" />
      <span className={styles["trust-logos__review"]} id={client.reviewId} role="tooltip">
        <span className={styles["trust-logos__review-name"]}>{client.name}</span>
        <strong className={styles["trust-logos__review-id"]}>{client.reviewId}</strong>
        <em className={styles["trust-logos__review-text"]}>{client.review}</em>
      </span>
    </a>
  );
}
