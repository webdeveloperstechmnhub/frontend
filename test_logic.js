const data = {
  "registrationSettings": {
    "enabled": true,
    "deadline": null,
    "maxRegistrations": 0,
    "waitingList": false,
    "autoConfirmation": true
  },
  "comingSoon": false,
  "status": "published"
};

const status = data.comingSoon
  ? "coming_soon"
  : data.registrationSettings?.enabled === false || ["closed", "draft", "archived"].includes(data.status)
    ? "closed"
    : "active";

const registrationEnabled = data.registrationSettings?.enabled !== false;

const eventMeta = { status, registrationEnabled, comingSoon: data.comingSoon };

const isEventComingSoon = eventMeta.status === "coming_soon" || eventMeta.comingSoon;
const isEventClosed = eventMeta.status === "closed" || isEventComingSoon || eventMeta.registrationEnabled === false;

console.log("status:", status);
console.log("registrationEnabled:", registrationEnabled);
console.log("isEventClosed:", isEventClosed);
