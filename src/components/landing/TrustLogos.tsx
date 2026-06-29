"use client";

import { useEffect, useRef, useState } from "react";
import type { PortfolioData } from "@/context/PortfolioContentContext";
import styles from "./TrustLogos.module.scss";

type Client = PortfolioData["clients"][number];

export function TrustLogos({ clients }: { clients: Client[] }) {
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoClients = clients.filter((client) => client.showInLogos);
  const proofClient = clients.find((client) => "proofLabel" in client);
  const proofLabel = proofClient && "proofLabel" in proofClient ? proofClient.proofLabel : "";

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setActiveClient(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div className={styles["trust-logos"]} aria-labelledby="trust-heading" ref={wrapperRef}>
      <div className={styles["trust-logos__label"]} id="trust-heading">
        {proofLabel}
      </div>
      <div className={styles["trust-logos__list"]}>
        {logoClients.map((client) => (
          <LogoAsset
            key={client.name}
            client={client}
            isOpen={activeClient === client.name}
            onToggle={() => setActiveClient((current) => (current === client.name ? null : client.name))}
          />
        ))}
      </div>
    </div>
  );
}

function LogoAsset({ client, isOpen, onToggle }: { client: Client; isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      className={`${styles["trust-logos__logo"]} ${isOpen ? styles["trust-logos__logo--open"] : ""} ${
        "invert" in client && client.invert ? styles["trust-logos__logo--invert"] : ""
      }`}
      aria-describedby={client.reviewId}
      aria-expanded={isOpen}
      type="button"
      onClick={onToggle}
    >
      <img src={client.logo} alt={client.name} loading="lazy" />
      <span className={styles["trust-logos__review"]} id={client.reviewId} role="tooltip">
        <span className={styles["trust-logos__review-name"]}>{client.name}</span>
        <span className={styles["trust-logos__review-text"]}>{client.review}</span>
        <a className={styles["trust-logos__review-link"]} href={client.website} target="_blank" rel="noreferrer">
          Visit website
        </a>
      </span>
    </button>
  );
}
