import{u as I,a as w,r as m,f as U,a3 as k,c as F,d as _,j as e,S as A,B as r,L as f,P as L,U as R,g as E,M as l,h as P,I as j,k as y}from"./index-36743386.js";import{C as B}from"./SubCategoryServices-ce59e561.js";function M(n,t){const a=new FileReader;a.onloadend=()=>{t(a.result)},a.readAsDataURL(n)}function V(){const n=I(s=>s.user.user),t=w(),[a,i]=m.useState(!1),[c,x]=m.useState(null),[h,b]=m.useState({fileUrl:""}),d=U(),u=k(),{register:p,handleSubmit:N,reset:C,formState:{errors:T}}=F(),S=_(B),v=s=>{h.fileUrl!==""?s.image=h.fileUrl:s.image="",s.brand_id=u.brand_id,s.category_id=u.category_id;let o=u.category_id;S.mutate({data:s,token:n.jwt,id:o},{onSuccess:g=>{t.push(e.jsx(l,{type:"success",children:"Category added successfully"})),d(-1)},onError:g=>{console.log(g),t.push(e.jsx(l,{type:"error",children:"Category add failed ! Try Again."}))}}),C()};return e.jsx(e.Fragment,{children:e.jsxs(A,{justifyContent:"center",alignItems:"center",direction:"column",className:"mt-20 2xl:mt-[-3rem] ",style:{height:"100vh"},children:[e.jsxs(r,{className:"text-xl font-mono ",children:[e.jsx(r.Item,{as:f,to:"/dashbord",children:"Home"}),e.jsx(r.Item,{as:f,to:"/dashbord/all-company",children:"brand-list"}),e.jsx(r.Item,{className:"cursor-pointer hover:text-blue-500",onClick:()=>{d(-1)},children:"category-list"}),e.jsx(r.Item,{active:!0,className:"text-blue-400",children:"category-creation"})]}),e.jsx(L,{bordered:!0,className:"shadow-sm w-[50rem] border-gray-300",style:{background:"#fff"},header:e.jsx("h3",{className:"font-bold bg-indigo-500 p-8 text-2xl text-white rounded-lg",children:"Add Category Information"}),children:e.jsxs("form",{onSubmit:N(v),children:[e.jsx("div",{className:"flex justify-center items-center mb-10 ",children:e.jsx(R,{fileListVisible:!1,listType:"picture",action:`${E.endpoints.host}/upload`,onUpload:s=>{i(!0),M(s.blobFile,o=>{x(o)})},onSuccess:(s,o)=>{i(!1),t.push(e.jsx(l,{type:"success"})),b(s)},onError:()=>{x(null),i(!1),t.push(e.jsx(l,{type:"error"}))},children:e.jsxs("button",{type:"button",style:{width:150,height:150},children:[a&&e.jsx(P,{backdrop:!0,center:!0}),c?e.jsx("img",{src:c,width:"100%",height:"150%"}):e.jsx("img",{src:c,alt:"Category Profile"})]})})}),e.jsx("div",{className:"flex  gap-5 justify-center",children:e.jsxs("div",{className:"flex flex-col gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Category Name"}),e.jsx(j,{...p("subcategory_name"),className:"w-96"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Category Information"}),e.jsx(j,{...p("description"),as:"textarea",rows:3})]}),e.jsxs("div",{className:"2xl:mb-4 flex gap-2",children:[e.jsx(y,{appearance:"ghost",onClick:()=>d(-1),children:"Cancel"}),e.jsx(y,{type:"submit",appearance:"primary",className:"bg-blue-600",children:"Add Category"})]})]})})]})})]})})}export{V as default};
