const h1 = document.createElement("h1")
h1.textContent = "Hello world"
h1.className = "header"
console.log(h1)

// <h1 class="header">
// basically vanilla javascript is imperative - you have to declare to the program what you wanna do 
//what h1 returns is a html element in this case h1 

const element = <h1 className="header">This is JSX</h1>
console.log(element)

/*
{
    type: "h1", 
    key: null, 
    ref: null, 
    props: {
        className: "header", 
        children: "This is JSX"
    }, 
    _owner: null, 
    _store: {}
}
 */

//we see that jsx is actually a javascript object in nature with many keys and attributes. The props is an 
//important attribute which stores className and any other attributes of the html element(eg. href, src, style)
//also stores the children(what is nested inside it)
//declarative nature of react - you just declare to react what u wanna do and leave it upto react to figure
//out how to render jsx onto the page.

// IMAGES FILE PATH ON REACT STACKOVERFLOW -  https://stackoverflow.com/questions/37644265/correct-path-for-img-on-react-js