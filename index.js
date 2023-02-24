let bookshelf=[];
let markedarray=[];

class Book{
    constructor(Title, Author,Language,Categroy,Pagenum){
        this.Title=Title;
        this.Author=Author;
        this.Language=Language;
        this.Categroy=Categroy;
        this.Pagenum=Pagenum;
        this.Marked="No";
    }  
}
let btnadd=document.getElementById("btnadd")
let categorychos = document.getElementsByName("Category");
let markedcheck=document.getElementById("markedlabel");
btnadd.addEventListener("click", ()=>{
    let inputtit=document.getElementById("Title").value
    let inputauthor=document.getElementById("Author").value
    let inputlan=document.getElementById("Language").value
    let randompage=Math.floor((Math.random() * (800)) + 1);
   let inputcat;
    
    for(let i=0; i<categorychos.length; i+=1){
        if(categorychos[i].checked){
            inputcat = categorychos[i].value;
            break
        } 
    }
    let newbook= new Book(inputtit,inputauthor,inputlan,inputcat,randompage);

    if (markedcheck.checked){
        newbook.Marked="Yes";
        markedarray.push(newbook)
    }
    else{
        newbook.Marked="No";
    }
    bookshelf.unshift(newbook)
    renderbooks(bookshelf[0])
})

function renderbooks(input){
     let valuearr=Object.values(input);
     let keysarr = Object.keys(input);
    //  let markedarray=[];
     let btncancel=document.createElement("button"); 
        btncancel.innerText="delete"
        btncancel.id="btncancel";
        btncancel.classList="material-symbols-outlined"
//         
       
        let btnbookcom=document.createElement("button"); 
        btnbookcom.innerText="add_circle"
        btnbookcom.id="btnbookcom";
        btnbookcom.classList="material-symbols-outlined";

     let bookcomment=document.createElement("textarea");
     bookcomment.name="bookcomments";
     bookcomment.placeholder="type your comments here";
     bookcomment.maxLength=280;
     bookcomment.id="bookcomments"




     let ul=document.createElement("ul");
         ul.classList="ul"
         let div=document.createElement("div");
        div.classList="singlebook" 
    
    let bookcount=document.getElementById("bookcount")
    let booksum=bookshelf.reduce(sum => sum + 1, 0)
    bookcount.innerText="Count of Books:"+booksum

    let markcount=document.getElementById("bookmarkcount")
    let marksum=markedarray.reduce(sum => sum + 1, 0)
    markcount.innerText="Count of Books Marked:"+marksum;

        
        for(i=0; i<valuearr.length; i+=1){
         let li=document.createElement("li");
         li.classList="li"
         li.innerText=keysarr[i]+":"+valuearr[i]
        
         li.appendChild (btncancel);
         ul.appendChild(li);
           ul.appendChild(bookcomment);
           ul.appendChild(btnbookcom);
           div.appendChild(ul);
        
        
         document.getElementById("bookscontainer").appendChild(div)}
         
         btncancel.addEventListener("click", ()=>{                                                                                    
            div.remove(); 
            bookshelf = bookshelf.filter((ele)=>!(ele.Title.includes(valuearr[0])))
            booksum=bookshelf.length;
            bookcount.innerText="Count of Books:"+booksum 

        })
        

         btnbookcom.addEventListener("click", ()=>{
             let li=document.createElement("li");
             li.id="comli"
             let msg=bookcomment.value;
             li.innerHTML = `${msg} <button id="btncommremove" class="material-symbols-outlined">delete</button> `;
             div.appendChild(li);
             let btncommremove=document.getElementById("btncommremove");
             btncommremove.addEventListener("click",()=>{
                 li.remove();
             })
         })

} 

let btnsearch=document.getElementById("btnsearch")
let searchoutput=document.getElementById("searchoutput")



btnsearch.addEventListener("click", ()=>{
   let bookfound=bookshelf.filter((ele)=>ele.Title.includes(document.getElementById("Titlesearch").value) && ele.Author.includes(document.getElementById("Authorsearch").value));
   renderbookfound(bookfound);
})

let btnsearchcat=document.getElementById("btnsearchcat");
let search_catchos = document.getElementsByName("Categorysear");

btnsearchcat.addEventListener("click",()=>{
let valueget;
    for(let i=0; i<search_catchos.length; i+=1){
        if(search_catchos[i].checked){
            valueget = search_catchos[i].value;
            break
        } 
    }

    let bookfound=bookshelf.filter((ele)=>ele.Categroy.includes(valueget));
    renderbookfound(bookfound)
    
})

let btnsearchpage=document.getElementById("btnsearchpage");
let search_pages=document.getElementsByName("Pagesear");

btnsearchpage.addEventListener("click",()=>{
    let index;
    for(let i=0; i<search_pages.length; i+=1){
        if(search_pages[i].checked){
           index=i
           break
        } 
       
    }

    let bookfound;

    if(index===0){
        bookfound=bookshelf.filter((ele)=>ele.Pagenum<300)
    }

    if(index===1){
        bookfound=bookshelf.filter((ele)=>ele.Pagenum>=300 && ele.Pagenum<=600)
    }

    if(index===2){
        bookfound=bookshelf.filter((ele)=>ele.Pagenum>600)
    }
   renderbookfound(bookfound);

})

    


   function renderbookfound(arr){
    let btncancel2=document.createElement("button"); 
        btncancel2.innerText="delete"
        btncancel2.classList="material-symbols-outlined"

     let ul=document.createElement("ul");
        ul.classList="ul"
    let div=document.createElement("div");
    div.classList="singlebooksearch" 

    if(arr.length === 0){
        let li=document.createElement("li");
            li.classList="li"
        li.innerText="Sorry, this book is not in your list."
        li.appendChild (btncancel2);
             ul.appendChild(li);
            div.appendChild(ul);
            searchoutput.appendChild(div);
    }

    else{
    arr.forEach(ele => {
    let valuearr=Object.values(ele);
     let keysarr = Object.keys(ele);
    for(i=0; i<valuearr.length; i+=1){
        let li=document.createElement("li");
        li.classList="li"
        li.innerText=keysarr[i]+":"+valuearr[i];
        li.appendChild (btncancel2);
         ul.appendChild(li);
           div.appendChild(ul);
           searchoutput.appendChild(div);
   } })};

btncancel2.addEventListener("click", ()=>{                                                                                    
    div.remove();  
})
}



let webbtn=document.getElementById("webbtn");
webbtn.addEventListener("click",()=>{
 let reviewbox=document.getElementById("reviewbox")
  let msg=document.getElementById("webcomments").value
  let ul=document.createElement("ul");
  let btncancel2=document.createElement("button"); 
        btncancel2.innerText="delete"
        btncancel2.classList="material-symbols-outlined";

  ul.classList="ul"
     let li=document.createElement("li");
     li.classList="li"
     li.innerText=msg;
     li.appendChild(btncancel2)
    ul.appendChild(li);
     reviewbox.appendChild(ul); 
     
     btncancel2.addEventListener("click", ()=>{                                                                                    
        ul.remove();  
    })
     
})

function validate(){
    let password = document.getElementById("pass");
    let user=document.getElementById("user");

    if(emailcheck(user.value)===true && password.value.length >= 8){
        alert("Login Succesfull");
        window.location.href="http://127.0.0.1:5500/BOOKSHELF-APP/index.html"
    }
    else{
        alert("Login Failed");
    }


    function emailcheck(email){
        const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
}