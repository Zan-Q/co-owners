import{j as o}from"./jsx-runtime-D2HyDbKh.js";import{g as i}from"./misc-BxwGVpjn.js";import{o as a,p as c,q as p}from"./index-PxjvPj8E.js";import{i as f,c as u}from"./exports-BPTENwJi.js";function m(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.headers=="object"&&typeof r.body<"u"}function d(r){if(!(m(r)||f()||!(r instanceof Error)))return u(r,{mechanism:{type:"instrument",handled:!1,data:{function:"ReactError"}}})}function j({defaultStatusHandler:r=({error:e})=>o.jsxs("p",{children:[e.status," ",e.data]}),statusHandlers:t,unexpectedErrorHandler:n=e=>o.jsx("p",{children:i(e)})}){const e=a();d(e);const s=c();return typeof document<"u"&&console.error(e),o.jsx("div",{className:"container flex items-center justify-center p-20 text-h2",children:p(e)?((t==null?void 0:t[e.status])??r)({error:e,params:s}):n(e)})}export{j as G};
//# sourceMappingURL=error-boundary-r2anonTu.js.map