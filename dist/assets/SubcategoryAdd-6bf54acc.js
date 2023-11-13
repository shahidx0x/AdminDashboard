import{u as w,r as m,b as U,t as k,j as e,S as A,L as g,c as F,B as b}from"./index-800578be.js";import{u as R}from"./index.esm-d60152a8.js";import{u as _}from"./find-4e6c2113.js";import{C as L}from"./SubCategoryServices-d6aa268c.js";import{c as B}from"./api.config-65890cae.js";import{u as E}from"./useToaster-ec5fa3c2.js";import{B as o}from"./Breadcrumb-9d3d2cfe.js";import{P}from"./Panel-451b88fa.js";import{U as M}from"./Uploader-0a9468b7.js";import{M as i}from"./toaster-bc74e3a6.js";import{I as j}from"./Input-ff9c91fa.js";import"./utils-0507c293.js";import"./AngleDown-2d00398c.js";import"./statusIcons-63c13e8b.js";function T(n,t){const r=new FileReader;r.onloadend=()=>{t(r.result)},r.readAsDataURL(n)}function ee(){const n=w(s=>s.user.user),t=E(),[r,l]=m.useState(!1),[c,u]=m.useState(null),[p,y]=m.useState({fileUrl:""}),f=U(),d=k(),{register:x,handleSubmit:S,reset:N,formState:{errors:D}}=R(),C=_(L),v=s=>{p.fileUrl!==""?s.image=p.fileUrl:s.image="",s.brand_id=d.brand_id,s.category_id=d.category_id;let a=d.category_id;C.mutate({data:s,token:n.jwt,id:a},{onSuccess:h=>{t.push(e.jsx(i,{type:"success",children:"Sub Category added successfully"}))},onError:h=>{console.log(h),t.push(e.jsx(i,{type:"error",children:"Sub Category Add failed ! Try Again."}))}}),N()};function I(){f(-1)}return e.jsx(e.Fragment,{children:e.jsxs(A,{justifyContent:"center",alignItems:"center",direction:"column",className:"mt-20 2xl:mt-[-3rem] ",style:{height:"100vh"},children:[e.jsxs(o,{className:"text-xl font-mono ",children:[e.jsx(o.Item,{as:g,to:"/dashbord",children:"Home"}),e.jsx(o.Item,{as:g,to:"/dashbord/all-company",children:"category-list"}),e.jsx(o.Item,{className:"cursor-pointer hover:text-blue-500",onClick:()=>{f(-1)},children:"sub-category-list"}),e.jsx(o.Item,{active:!0,className:"text-blue-400",children:"sub-category-creation"})]}),e.jsx(P,{bordered:!0,className:"shadow-sm w-[50rem] border-gray-300",style:{background:"#fff"},header:e.jsx("h3",{className:"font-bold bg-indigo-500 p-8 text-2xl text-white rounded-lg",children:"Add Sub Category Information"}),children:e.jsxs("form",{onSubmit:S(v),children:[e.jsx("div",{className:"flex justify-center items-center mb-10 ",children:e.jsx(M,{fileListVisible:!1,listType:"picture",action:`${B.endpoints.host}/upload`,onUpload:s=>{l(!0),T(s.blobFile,a=>{u(a)})},onSuccess:(s,a)=>{l(!1),t.push(e.jsx(i,{type:"success"})),y(s)},onError:()=>{u(null),l(!1),t.push(e.jsx(i,{type:"error"}))},children:e.jsxs("button",{type:"button",style:{width:150,height:150},children:[r&&e.jsx(F,{backdrop:!0,center:!0}),c?e.jsx("img",{src:c,width:"100%",height:"150%"}):e.jsx("img",{src:c,alt:"Category Profile"})]})})}),e.jsx("div",{className:"flex  gap-5 justify-center",children:e.jsxs("div",{className:"flex flex-col gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Sub Category Name"}),e.jsx(j,{...x("subcategory_name"),className:"w-96"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Sub Category Information"}),e.jsx(j,{...x("description"),as:"textarea",rows:3})]}),e.jsxs("div",{className:"2xl:mb-4 flex gap-2",children:[e.jsx(b,{appearance:"ghost",onClick:()=>I(),children:"Cancel"}),e.jsx(b,{type:"submit",appearance:"primary",className:"bg-blue-600",children:"Add Sub Category"})]})]})})]})})]})})}export{ee as default};
