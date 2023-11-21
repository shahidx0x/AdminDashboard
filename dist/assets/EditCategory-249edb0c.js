import{u as M,a as P,r as o,b as A,c as H,d as z,e as Q,f as $,j as e,S as q,B as c,L as S,P as G,U as J,g as K,M as u,h as O,C as W,I as m,i as C}from"./index-1fa5fa07.js";import{g as X}from"./BrandServices-5b1d03db.js";import{u as Y}from"./CategoryService-ce6fe38a.js";import{S as Z}from"./SelectPicker-5f81d416.js";function D(l,r){const n=new FileReader;n.onloadend=()=>{r(n.result)},n.readAsDataURL(l)}function le(){var y,N,_;const l=M(s=>s.user.user),r=P(),[n,p]=o.useState(!1),[x,h]=o.useState(null),[b,v]=o.useState({fileUrl:""}),f=A(),a=(y=f.state)==null?void 0:y.myData;console.log((N=f.state)==null?void 0:N.myData);const{register:d,control:I,handleSubmit:w,reset:U,formState:{errors:ee}}=H({defaultValues:{brand_id:a.brand_id}}),B=z(Y),[k,L]=o.useState(null),[E,F]=o.useState(a.brand_name),T=s=>{b.fileUrl!==""?s.image=b.fileUrl||a.image:s.image=a.image,s.brand_id=k,s.brand_name=E,s.id=a==null?void 0:a._id;let t=a==null?void 0:a._id;B.mutate({data:s,token:l.jwt,id:t},{onSuccess:i=>{r.push(e.jsx(u,{type:"success",children:"Category updated successfully"})),j(-1)},onError:i=>{console.log(i),r.push(e.jsx(u,{type:"error",children:"Category update failed ! Try Again."}))}}),U()},{data:g,status:se}=Q(["brandsIdName",l.jwt],X),R=[...((_=g==null?void 0:g.data)==null?void 0:_.map(s=>({label:s==null?void 0:s.name,value:s.id})))||["loading"]].map(s=>({label:s==null?void 0:s.label,value:s==null?void 0:s.value})),j=$();function V(){j("/dashbord/category/all")}return e.jsx(e.Fragment,{children:e.jsxs(q,{justifyContent:"center",alignItems:"center",direction:"column",className:"-mt-10",style:{height:"100vh"},children:[e.jsxs(c,{className:"text-xl font-mono ",children:[e.jsx(c.Item,{as:S,to:"/dashbord",children:"Home"}),e.jsx(c.Item,{as:S,to:"/dashbord/category/all",children:"category-list"}),e.jsx(c.Item,{active:!0,className:"text-blue-400",children:"category-update"})]}),e.jsx(G,{bordered:!0,className:"shadow-md w-[40rem] border-gray-400",style:{background:"#fff"},header:e.jsx("h3",{className:"font-bold bg-indigo-500 text-white p-3 rounded-md text-2xl ",children:"Edit Category Information"}),children:e.jsxs("form",{onSubmit:w(T),children:[e.jsx("div",{className:"flex justify-center items-center mb-8",children:e.jsx(J,{fileListVisible:!1,listType:"picture",action:`${K.endpoints.host}/upload`,onUpload:s=>{p(!0),D(s.blobFile,t=>{h(t)})},onSuccess:(s,t)=>{p(!1),r.push(e.jsx(u,{type:"success"})),v(s)},onError:()=>{h(null),p(!1),r.push(e.jsx(u,{type:"error"}))},children:e.jsxs("button",{type:"button",style:{width:150,height:150},children:[n&&e.jsx(O,{backdrop:!0,center:!0}),x?e.jsx("img",{src:x,width:"100%",height:"150%"}):e.jsx("img",{src:a==null?void 0:a.image,alt:"Category Profile"})]})})}),e.jsx("div",{className:"flex gap-5 justify-center",children:e.jsxs("div",{className:"flex flex-col gap-5",children:[e.jsx("div",{children:e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Select Company"}),e.jsx(W,{name:"brand_id",...d("brand_id"),control:I,render:({field:s})=>e.jsx(Z,{placeholder:a==null?void 0:a.brand_name,searchable:!0,...s,size:"md",data:R,className:"w-96",onChange:(t,i)=>{s.onChange(t),F(i.target.innerHTML),L(t)},onBlur:()=>s.onBlur()})})]})}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Category Name"}),e.jsx(m,{...d("category_label"),defaultValue:a==null?void 0:a.category_label,className:"w-96"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Category Type"}),e.jsx(m,{...d("category_type"),defaultValue:a==null?void 0:a.category_type,className:"w-96"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Category Information"}),e.jsx(m,{defaultValue:a==null?void 0:a.category_description,...d("category_description"),as:"textarea",rows:3})]}),e.jsxs("div",{className:" flex gap-2 mb-9",children:[e.jsx(C,{appearance:"ghost",onClick:()=>V(),children:"Cancel"}),e.jsx(C,{type:"submit",appearance:"primary",className:"bg-blue-600",children:"Update Category"})]})]})})]})})]})})}export{le as default};
