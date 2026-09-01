// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const __URL_MATCH__ = ["https://*/*", "http://*/*", "file://*/*"];

const __MANIFEST__: Record<string, unknown> = {
  manifest_version: 3,
  name: "Force Copy",
  version: "0.0.0",
  description: "Force Copy Everything",
  default_locale: "en",
  icons: {
    32: "./static/favicon.128.png",
    96: "./static/favicon.128.png",
    128: "./static/favicon.128.png",
  },
  action: {
    default_popup: "popup.html",
    default_icon: "./static/favicon.128.png",
  },
  content_scripts: [
    {
      matches: [...__URL_MATCH__],
      js: ["./content.js"],
      run_at: "document_start",
      all_frames: true,
    },
  ],
  web_accessible_resources: [
    {
      resources: ["static/*", process.env.INJECT_FILE + ".js"],
      matches: ["<all_urls>"],
    },
  ],
  background: {
    service_worker: "worker.js",
  },
  host_permissions: [...__URL_MATCH__],
  permissions: ["activeTab", "tabs", "scripting"],
  minimum_chrome_version: "88.0",
};

module.exports = __MANIFEST__;
