//Calculator
let value = "";
let result = 0;
let sum=false;
let res=false;
let mul=false;
let div=false;
let equ=false;
let firstOp=true;

$('button').click(function () {
    $('#screen').val(valid(this.innerText));
    if (this.innerText === '+') {
        add();
    } else if (this.innerText === '-') { 
        rest();
    } else if (this.innerText === 'X') { 
        multiply();
    } else if (this.innerText === '/') { 
        divide();
    } else if (this.innerText === '=' || this.innerText === 'Enter') {
        equal();
    } else if(this.innerText.toUpperCase() === 'RESET') {
       reset();
    } else if(this.innerText.toUpperCase() === 'DEL') {
        del();
    } 
    addAnimation(this.innerText);
    this.blur();
})

$(document).keydown(function(e) {
    $("#screen").val(valid(e.key));
    if (e.key === '+') {
        add();
    } else if (e.key === '-') { 
        rest();
    } else if (e.key === '*') { 
        multiply();
    } else if (e.key === '/') { 
        divide();
    } else if (e.key === '=' || e.key === 'Enter') {
        equal();
    } else if (e.key.toUpperCase() ==='ESCAPE') {
        reset();
    } else if (e.key.toUpperCase() ==='BACKSPACE') {
        del();
    }
    addAnimation(e.key);
})

function valid (input) {
    if(/[0-9\.]/.test(input)) {
        if(input == "." && value.includes(".")) {
            value += '';
        } else {
            value += input;
        }
    }
    return value;
}

function add() {
    if(div) {                      
        result /= Number(valid());          
    } else if(mul) {        
        result *= Number(valid());
    } else if(res) {
        result -= Number(valid());
    } else {       
        result += Number(valid());
    }    
    $("#screen").val(result);
    value = "" 
    sum=true;
    res=false;
    mul=false;
    div=false
    firstOp=false;
}

function rest() {
    if(firstOp) {
        result += Number(valid());
    } else {
        if(div) {                      
            result /= Number(valid());          
        } else if(mul) {
            result *= Number(valid());
        } else if(sum) {
            result += Number(valid());
        } else {
            result -= Number(valid());
        }    
    }
    $("#screen").val(result);  
    value = "" 
    sum=false;
    res=true;
    mul=false;
    div=false;
    firstOp=false;
}

function multiply() {   
    if(firstOp || equ) {
        result += Number(valid());
    } else {
        if(div) {                      
            result /= Number(valid());          
        } else if(res) {
            result -= Number(valid());
        } else if(sum) {
            result += Number(valid());
        } else {                      
            result *= Number(valid());          
        }   
    }
    $("#screen").val(result);
    value = "" 
    sum=false;
    res=false;
    mul=true;
    div=false;
    firstOp=false;
    equ=false;
}

function divide() {   
    if(firstOp || equ) {
        result += Number(valid());
    } else {
        if(res) {
            result -= Number(valid());
        } else if(sum) {
            result += Number(valid());
        } else if(mul) {                    
            result *= Number(valid());          
        } else {                    
            result /= Number(valid());          
        }
    }
    $("#screen").val(result);
    value = "" 
    sum=false;
    res=false;
    mul=false;
    div=true;
    firstOp=false;
    equ=false;
}

function equal() {
    if(sum) {
        result += Number(valid());
    }
    if(res) {
        result -= Number(valid());
    }
    if(mul) {
        result *= Number(valid());
    }
    if(div) {                      
        result /= Number(valid());          
    }
    $("#screen").val(result);
    value="";
    sum=false;
    res=false;
    mul=false;
    div=false;
    firstOp=false;
    equ=true;
}

function reset() {
    $('#screen').val("");
    value = "";
    result = 0;
    sum=false;
    res=false;
    mul=false;
    div=false;
    equ=false;
    firstOp=true;
}

function del () {
    value=value.replace(value.charAt(value.length-1),"");
    $('#screen').val(value);
}

function addAnimation(currentKey) {
    let activeButton = '';
    if (currentKey === '+') {
        activeButton = document.querySelector(".btnadd");
    } else if (currentKey === '-') { 
        activeButton = document.querySelector(".btnres");
    } else if (currentKey === 'X' || currentKey === '*') { 
        activeButton = document.querySelector(".btnmul");
    } else if (currentKey === '/') { 
        activeButton = document.querySelector(".btndiv");
    } else if (currentKey === '=' || currentKey === 'Enter') {
        activeButton = document.querySelector(".btnequ");
    } else if(currentKey === 'RESET' || currentKey === 'Escape') {
        activeButton = document.querySelector(".btnreset");
    } else if(currentKey === 'DEL' || currentKey === 'Backspace') {
    activeButton = document.querySelector(".btndel");
    } else {
    activeButton = document.querySelector(".btn" + currentKey.toLowerCase());
    }    
    activeButton.classList.add('pressed');
    setTimeout(()=>{
        activeButton.classList.remove('pressed');
    }, 100);
}

//Theme
const r = document.querySelector(':root');
const themeSelector=document.querySelector('input[type=range]')
themeSelector.addEventListener ('input' , () => {
    setTheme(themeSelector.value);    
})

function setTheme(theme) {
    /* Backgorunds */
    /* if(theme==='1') {
        r.style.setProperty('--mainBackground', 'hsl(222, 26%, 31%)');
    } else {
        r.style.setProperty('--mainBackground', theme==='2' ? 'hsl(0, 0%, 90%)' : 'hsl(268, 75%, 9%)');  
    } */

    r.style.setProperty('--mainBackground', theme==='1' ? 'hsl(222, 26%, 31%)' : theme==='2' ? 'hsl(0, 0%, 90%)' : 'hsl(268, 75%, 9%)');   
    r.style.setProperty('--toggleAndKeypadBackground', theme==='1' ? 'hsl(223, 31%, 20%)' : theme==='2' ? 'hsl(0, 5%, 81%)' : 'hsl(268, 71%, 12%)');   
    r.style.setProperty('--screenBackground', theme==='1' ? 'hsl(224, 36%, 15%)' : theme==='2' ? 'hsl(0, 0%, 93%)' : 'hsl(268, 71%, 12%)');  

    /* keys */
    r.style.setProperty('--keyBackgroundResDel', theme==='1' ? 'hsl(225, 21%, 49%)' : theme==='2' ? 'hsl(185, 42%, 37%)' : 'hsl(281, 89%, 26%)'); 
    r.style.setProperty('--keyShadowResDel', theme==='1' ? 'hsl(224, 28%, 35%)' : theme==='2' ? 'hsl(185, 58%, 25%)' : 'hsl(285, 91%, 52%)');
    r.style.setProperty('--keyBackgroundTogIqual', theme==='1' ? 'hsl(6, 63%, 50%)' : theme==='2' ? 'hsl(25, 98%, 40%)' : 'hsl(176, 100%, 44%)'); 
    r.style.setProperty('--keyShadowTogIgual', theme==='1' ? 'hsl(6, 70%, 34%)' : theme==='2' ? 'hsl(25, 99%, 27%)' : 'hsl(177, 92%, 70%)'); 
    r.style.setProperty('--keyBackground', theme==='1' ? 'hsl(30, 25%, 89%)' : theme==='2' ? 'hsl(45, 7%, 89%)' : 'hsl(268, 47%, 21%)'); 
    r.style.setProperty('--keyShadow', theme==='1' ? 'hsl(28, 16%, 65%)' : theme==='2' ? 'hsl(35, 11%, 61%)' : 'hsl(290, 70%, 36%)');

    /* Text */
    r.style.setProperty('--text1', theme==='1' ? 'hsl(221, 14%, 31%)' : theme==='2' ? 'hsl(60, 10%, 19%)' : 'hsl(52, 100%, 62%)'); 
    r.style.setProperty('--text2', theme==='1' ? '#fff' : theme==='2' ? '#fff' : '#fff'); 
    r.style.setProperty('--text3', theme==='1' ? '#fff' : theme==='2' ? 'hsl(60, 10%, 19%)' : 'hsl(52, 100%, 62%)'); 
}