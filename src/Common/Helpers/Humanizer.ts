import humanizeDuration from "humanize-duration";

export const humanize = humanizeDuration.humanizer({
  language: "ru",
  units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
  round: true
});