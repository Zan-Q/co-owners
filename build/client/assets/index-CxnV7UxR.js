import{j as e}from"./jsx-runtime-D2HyDbKh.js";import{G as m}from"./error-boundary-r2anonTu.js";import{S as i}from"./spacer-ByPtYu5l.js";import{B as r}from"./button-BOdK6DJc.js";import{I as c}from"./icon-DNfY9fbA.js";import{u as o}from"./user-DTujC4T9.js";import{b as d,F as x,L as a}from"./components-BulwabtP.js";import"./misc-BxwGVpjn.js";import"./clsx-B-dksMZM.js";import"./index-Cd_vq22D.js";import"./index-PxjvPj8E.js";import"./exports-BPTENwJi.js";import"./index-tx3aR2qd.js";function E(){const{user:s,userJoinedDisplay:n}=d(),t=o(),l=s._id===(t==null?void 0:t._id);return e.jsxs("div",{className:"container mb-48 mt-36 flex flex-col items-center justify-center",children:[e.jsx(i,{size:"4xs"}),e.jsxs("div",{className:"container flex flex-col items-center rounded-3xl bg-muted p-12",children:[e.jsx(i,{size:"sm"}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"flex flex-wrap items-center justify-center gap-4",children:e.jsx("h1",{className:"text-center text-h2",children:s.name})}),e.jsxs("p",{className:"mt-2 text-center text-muted-foreground",children:["Joined: ",n]}),e.jsxs("div",{className:"bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-5",children:[e.jsx("h2",{className:"text-2xl text-center font-bold mb-4",children:"User Statistics"}),e.jsxs("div",{className:"flex flex-row justify-between gap-4",children:[e.jsxs("div",{className:"flex flex-col justify-between",children:[e.jsx("span",{className:"text-center text-lg",children:s.history.length}),e.jsx("span",{className:"text-sm",children:" Trades Lifetime"})]}),e.jsxs("div",{className:"flex flex-col justify-between",children:[e.jsx("span",{className:"text-center text-lg",children:s.investments.length}),e.jsx("span",{className:"text-sm",children:" Investments Lifetime"})]})]})]}),l?e.jsx(x,{action:"/logout",method:"POST",className:"mt-3",children:e.jsx(r,{type:"submit",variant:"link",size:"pill",children:e.jsx(c,{name:"exit",className:"scale-125 max-md:scale-150",children:"Logout"})})}):null,e.jsxs("div",{className:"mt-10 flex gap-4",children:[e.jsx(r,{asChild:!0,children:e.jsx(a,{to:"/dashboard",prefetch:"intent",children:"Dashboard"})}),e.jsx(r,{asChild:!0,children:e.jsx(a,{to:{pathname:"/settings/profile",search:`?id=${s._id}&username=${s.username}&name=${s.name}&email=${s.email}`},prefetch:"intent",children:"Edit profile"})})]})]})]})]})}function S(){return e.jsx(m,{statusHandlers:{404:({params:s})=>e.jsxs("p",{children:['No user with the username "',s.username,'" exists']})}})}export{S as ErrorBoundary,E as default};
//# sourceMappingURL=index-CxnV7UxR.js.map