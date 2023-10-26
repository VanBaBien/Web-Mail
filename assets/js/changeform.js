const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form1 = $(".form-1")
const form2 = $(".form-2")
const changeloginauth = $(".change-login--auth")
const changeauthlogin = $(".change-auth--login")
const btnlogin = $(".btn--login")
const btnauth = $(".btn--auth")
const modal = $(".modal")
const closeform1 = $(".close--form1")
const closeform2 = $(".close--form2")

btnauth.onclick =function() {
 modal.classList.toggle("hiden")
 form1.classList.toggle("hiden")
}

btnlogin.onclick =function() {
    modal.classList.toggle("hiden")
    form2.classList.toggle("hiden")
   }


changeloginauth.onclick = function() {
    form1.classList.toggle("hiden")
    form2.classList.toggle("hiden")
}
changeauthlogin.onclick = function() {
    form1.classList.toggle("hiden")
    form2.classList.toggle("hiden")
}

closeform1.onclick = function() {
    modal.classList.add("hiden")
 form1.classList.add("hiden")
}
closeform2.onclick = function() {
    modal.classList.add("hiden")
 form2.classList.add("hiden")
}