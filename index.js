let bookshelf=[];
let markedarray=[];


class Book{
    constructor(Title, Author,Language,Categroy,Pagenum){
        this.Title=Title;
        this.Author=Author;
        this.Language=Language;
        this.Categroy=Categroy;
        this.Pagenum=Pagenum;
    }  
}
let btnadd=document.getElementById("btnadd")
let categorychos = document.getElementsByName("Category");

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
    bookshelf.unshift(newbook)
    renderbooks(bookshelf[0])
})

function renderbooks(input){
     let valuearr=Object.values(input);
     let keysarr = Object.keys(input);
    //  let markedarray=[];
     let btncancel=document.createElement("button"); 
        btncancel.innerText="X"
        btncancel.id="btncancel";
       
        let btnbookcom=document.createElement("button"); 
        btnbookcom.innerText="Add Comments"
        btnbookcom.id="btnbookcom";

     let bookcomment=document.createElement("textarea");
     bookcomment.name="bookcomments";
     bookcomment.placeholder="type your comments here";
     bookcomment.maxLength=280;
     bookcomment.id="bookcomments"

    let markcheckbox = document.createElement('input');
        markcheckbox.type = "checkbox";
        markcheckbox.name = "markcheckbox";
        markcheckbox.id = "markcheckbox"
   let marklabel = document.createElement('label');
   let  tn = document.createTextNode("Mark it and read latter?");
         marklabel.htmlFor="markcheckbox";
         marklabel.appendChild(tn); 


     let ul=document.createElement("ul");
         ul.classList="ul"
         let div=document.createElement("div");
        div.classList="singlebook" 
    
    let bookcount=document.getElementById("bookcount")
    let booksum=bookshelf.reduce(sum => sum + 1, 0)
    bookcount.innerText="Count of Books:"+booksum
        
        for(i=0; i<valuearr.length; i+=1){
         let li=document.createElement("li");
         li.classList="li"
         li.innerText=keysarr[i]+":"+valuearr[i]
        
         li.appendChild (btncancel);
         ul.appendChild(li);
         ul.appendChild(marklabel);
         ul.appendChild(markcheckbox)
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
             li.classList="li"
             let msg=bookcomment.value;
             li.innerHTML = `${msg} <button id="btncommremove" >X</button> `;
             div.appendChild(li);
             let btncommremove=document.getElementById("btncommremove");
             btncommremove.addEventListener("click",()=>{
                 li.remove();
             })
         })

        //  markcheckbox.addEventListener("check",()=>{
        //     markedarray.push(input);
        //     console.log(markedarray);
        // let summarked=markedarray.reduce(sum => sum + 1, 0);
        // bookmarkcount.innerText="Count of Books Marked:"+ summarked;
    
        // })
  
} 

let btnsearch=document.getElementById("btnsearch")
let searchoutput=document.getElementById("searchoutput")
// let searchtitle=document.getElementById("Titlesearch").value;
// let searchauthor=document.getElementById("Authorsearch").value;


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
        btncancel2.innerText="X"
        btncancel2.classList="btncancel2";

     let ul=document.createElement("ul");
        ul.classList="ul"
    let div=document.createElement("div");
    div.classList="singlebooksearch" 
    arr.forEach(ele => {
   if (typeof(ele)=== "object" ){
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
   }
}

else{
    let li=document.createElement("li");
        li.classList="li"
    li.innerText="Sorry, this book is not in your list."
    li.appendChild (btncancel2);
         ul.appendChild(li);
        div.appendChild(ul);
        searchoutput.appendChild(div);
}

});

btncancel2.addEventListener("click", ()=>{                                                                                    
    div.remove();  
})
}


