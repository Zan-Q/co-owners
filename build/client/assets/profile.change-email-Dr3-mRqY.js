import{j as e}from"./jsx-runtime-D2HyDbKh.js";import{z as n}from"./index-BeXw7Xwl.js";import{u as l,g as d,a as p,F as c,b as u,E as h}from"./forms-Dd4gJQEl.js";import{I as x}from"./icon-DNfY9fbA.js";import{S as f}from"./status-button-trRbWWOl.js";import{u as j}from"./misc-BxwGVpjn.js";import{E as g}from"./user-validation-Bfp_zbB5.js";import{b as E,a as b,F as C}from"./components-BulwabtP.js";import{p as P}from"./parse-DONhxXj2.js";import"./index-tx3aR2qd.js";import"./index-4Ns2fbOC.js";import"./index-PxjvPj8E.js";import"./button-BOdK6DJc.js";import"./tooltip-eZifkrgt.js";import"./clsx-B-dksMZM.js";import"./index-Cd_vq22D.js";const V={breadcrumb:e.jsx(x,{name:"envelope-closed",children:"Change Email"}),getSitemapEntries:()=>null},o=n.object({email:g});function W(){const t=E(),s=b(),[r,a]=l({id:"change-email-form",constraint:d(o),lastResult:s==null?void 0:s.result,onValidate({formData:m}){return P(m,{schema:o})}}),i=j();return e.jsxs("div",{children:[e.jsx("h1",{className:"text-h1",children:"Change Email"}),e.jsx("p",{children:"You will receive an email at the new email address to confirm."}),e.jsxs("p",{children:["An email notice will also be sent to your old address ",t.user.email,"."]}),e.jsx("div",{className:"mx-auto mt-5 max-w-sm",children:e.jsxs(C,{method:"POST",...p(r),children:[e.jsx(c,{labelProps:{children:"New Email"},inputProps:{...u(a.email,{type:"email"}),autoComplete:"email"},errors:a.email.errors}),e.jsx(h,{id:r.errorId,errors:r.errors}),e.jsx("div",{children:e.jsx(f,{status:i?"pending":r.status??"idle",children:"Send Confirmation"})})]})})]})}export{W as default,V as handle};
//# sourceMappingURL=profile.change-email-Dr3-mRqY.js.map