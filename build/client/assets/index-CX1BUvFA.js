import{j as e}from"./jsx-runtime-D2HyDbKh.js";import{b as n,a as i,F as l}from"./components-BulwabtP.js";import"./index-Cd_vq22D.js";import"./index-PxjvPj8E.js";function x(){const{businessName:t,logoUrl:r,businessId:o,session:a}=n(),s=i();return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8",children:e.jsxs("div",{className:"bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-md",children:[e.jsx("img",{src:r,alt:`${t} Logo`,className:"w-24 h-24 object-contain mb-4 mx-auto"}),e.jsxs("h1",{className:"text-xl sm:text-2xl font-bold mb-4 text-center",children:["Upload Receipt for ",t]}),e.jsxs(l,{method:"post",encType:"multipart/form-data",className:"space-y-4",children:[e.jsx("input",{type:"hidden",name:"id",value:o}),e.jsx("input",{type:"hidden",name:"businessname",value:t}),e.jsx("input",{type:"hidden",name:"session",value:a}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("label",{htmlFor:"image",className:"block text-sm font-medium text-gray-700 text-center sm:text-left",children:"Choose an image or pdf of the receipt"}),e.jsx("input",{type:"file",name:"image",id:"image",className:"mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",required:!0})]}),e.jsx("button",{type:"submit",className:"w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",children:"Upload"})]}),(s==null?void 0:s.error)&&e.jsx("p",{className:"mt-4 text-red-500 text-sm text-center",children:s.error})]})})}export{x as default};
//# sourceMappingURL=index-CX1BUvFA.js.map