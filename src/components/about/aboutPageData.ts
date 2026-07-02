import type { PortfolioData } from "@/context/PortfolioContentContext";
import toolCatalog from "@/content/tools/toolCatalog.json";

export function getAboutHeroStats(portfolio: PortfolioData) {
  const careerStart = portfolio.experienceLog.at(-1)?.year;
  const { heroStatAwardLabels } = portfolio.about;
  const experience = portfolio.about.awards.find((item) => item.label === heroStatAwardLabels.experience);
  const projects = portfolio.about.awards.find((item) => item.label === heroStatAwardLabels.projects);
  const jobSuccess = portfolio.about.awards.find((item) => item.label === heroStatAwardLabels.jobSuccess);

  return [
    careerStart ? { value: careerStart, label: portfolio.about.careerStartLabel } : null,
    experience ? { value: experience.value, label: experience.label } : null,
    projects ? { value: projects.value, label: projects.label } : null,
    jobSuccess ? { value: jobSuccess.value, label: jobSuccess.label } : null,
  ].filter((stat): stat is { value: string; label: string } => Boolean(stat));
}

export function getToolboxIconRows(iconKeys: PortfolioData["about"]["toolboxIconKeys"]) {
  const toolboxIcons = iconKeys
    .map((key) => toolCatalog[key as keyof typeof toolCatalog])
  .filter((tool): tool is { name: string; logo: string; description: string } => Boolean(tool?.logo))
  .map((tool) => ({ name: tool.name, src: tool.logo }));

  return [
    toolboxIcons.filter((_, index) => index % 2 === 0),
    toolboxIcons.filter((_, index) => index % 2 === 1),
  ];
}
