import{d as e}from"./components-BulwabtP.js";function o(r){return r&&typeof r=="object"&&typeof r.id=="string"}function t(){const r=e("root");if(!(!r||!o(r.user)))return r.user}function n(){const r=t();if(!r)throw new Error("No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.");return r}export{n as a,t as u};
//# sourceMappingURL=user-DTujC4T9.js.map