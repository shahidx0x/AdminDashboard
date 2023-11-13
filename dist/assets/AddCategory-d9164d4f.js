import{u as P,r as n,a as R,b as E,j as e,S as M,L as y,c as V,B as N}from"./index-800578be.js";import{u as H,C as z}from"./index.esm-d60152a8.js";import{u as Q}from"./find-4e6c2113.js";import{u as $}from"./useQuery-4aa8f065.js";import{g as q}from"./BrandServices-40cf72d4.js";import{c as G}from"./CategoryService-21df62d7.js";import{c as J}from"./api.config-65890cae.js";import{u as K}from"./useToaster-ec5fa3c2.js";import{B as d}from"./Breadcrumb-9d3d2cfe.js";import{P as O}from"./Panel-451b88fa.js";import{U as W}from"./Uploader-0a9468b7.js";import{M as c}from"./toaster-bc74e3a6.js";import{S as X}from"./SelectPicker-9702096a.js";import{I as f}from"./Input-ff9c91fa.js";import"./utils-0507c293.js";import"./AngleDown-2d00398c.js";import"./statusIcons-63c13e8b.js";import"./propTypes-3744a572.js";import"./isArrayLikeObject-1248cd30.js";function Y(l,a){const o=new FileReader;o.onloadend=()=>{a(o.result)},o.readAsDataURL(l)}function Ne(){var b,j;const l=P(s=>s.user.user),a=K(),[o,u]=n.useState(!1),[x,m]=n.useState(null),[h,S]=n.useState({fileUrl:""}),r=(b=R().state)==null?void 0:b.myData,{register:i,control:C,handleSubmit:v,reset:g,formState:{errors:D}}=H(),I=Q(G),[w,_]=n.useState(null),[U,B]=n.useState(null),k=s=>{h.fileUrl!==""?s.image=h.fileUrl:s.image="",s.brand_id=w,s.brand_name=U,console.table(s),I.mutate({data:s,token:l.jwt},{onSuccess:t=>{a.push(e.jsx(c,{type:"success",children:"Category added successfully"})),m(null),g()},onError:t=>{a.push(e.jsx(c,{type:"error",children:"Category Add failed ! Try Again."}))}}),g()},{data:p,status:ee}=$(["brandsIdName",l.jwt],q),A=[...((j=p==null?void 0:p.data)==null?void 0:j.map(s=>({label:s==null?void 0:s.name,value:s.id})))||["loading"]].map(s=>({label:s==null?void 0:s.label,value:s==null?void 0:s.value})),L=E();function F(){L("/dashbord/all-company")}return e.jsx(e.Fragment,{children:e.jsxs(M,{justifyContent:"center",alignItems:"center",direction:"column",className:"mt-20 2xl:mt-[-3rem] ",style:{height:"100vh"},children:[e.jsxs(d,{className:"text-xl font-mono ",children:[e.jsx(d.Item,{as:y,to:"/dashbord",children:"Home"}),e.jsx(d.Item,{as:y,to:"/dashbord/category/all",children:"category-list"}),e.jsx(d.Item,{active:!0,className:"text-blue-400",children:"category-creation"})]}),e.jsx(O,{bordered:!0,className:"shadow-sm w-[45rem]",style:{background:"#fff"},header:e.jsx("h3",{className:"font-bold bg-indigo-700 p-8 text-2xl text-white rounded-lg",children:"Add Category Information"}),children:e.jsxs("form",{onSubmit:v(k),children:[e.jsx("div",{className:"flex justify-center items-center mb-10 ",children:e.jsx(W,{fileListVisible:!1,listType:"picture",action:`${J.endpoints.host}/upload`,onUpload:s=>{u(!0),Y(s.blobFile,t=>{m(t)})},onSuccess:(s,t)=>{u(!1),a.push(e.jsx(c,{type:"success"})),S(s)},onError:()=>{m(null),u(!1),a.push(e.jsx(c,{type:"error"}))},children:e.jsxs("button",{type:"button",style:{width:150,height:150},children:[o&&e.jsx(V,{backdrop:!0,center:!0}),x?e.jsx("img",{src:x,width:"100%",height:"150%"}):e.jsx("img",{src:r==null?void 0:r.profilePicture,alt:"Category Profile"})]})})}),e.jsx("div",{className:"flex  gap-5 justify-center",children:e.jsxs("div",{className:"flex flex-col gap-5",children:[e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Select Company"}),e.jsx(z,{name:"brand_id",...i("brand_id"),control:C,render:({field:s})=>e.jsx(X,{searchable:!0,...s,size:"md",data:A,className:"w-96",onChange:(t,T)=>{s.onChange(t),B(T.target.innerHTML),_(t)},onBlur:()=>s.onBlur()})})]})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Category Name"}),e.jsx(f,{...i("category_label"),defaultValue:r==null?void 0:r.firstName,className:"w-96"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Category Type"}),e.jsx(f,{...i("category_type"),defaultValue:r==null?void 0:r.firstName,className:"w-96"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Category Information"}),e.jsx(f,{defaultValue:r==null?void 0:r.description,...i("category_description"),as:"textarea",rows:3})]}),e.jsxs("div",{className:"2xl:mb-4 flex gap-2 ",children:[e.jsx(N,{appearance:"ghost",className:"font-bold",onClick:()=>F(),children:"Cancel"}),e.jsx(N,{type:"submit",appearance:"primary",className:"bg-blue-600 font-bold",children:"Add Category"})]})]})})]})})]})})}export{Ne as default};
