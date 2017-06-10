var liNode,lengths;
window.onload= function fun(){
	liNode = document.getElementsByTagName ("li");
	lengths = liNode.length;
	for (var i = 0;i<lengths;i++){
		liNode[i].addEventListener('click',hack,false);
	}
	addElement();
};
function del_ff(elem){
var elem_child = elem.childNodes;
for(var i=0; i<elem_child.length;i++){
if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue))
{elem.removeChild(elem_child)
}
}
} 
function addElement(){
	var random_Numbers = parseInt(Math.random() * lengths);
	var sonNode = liNode[0].childNodes;
//	for(var i=0; i<sonNode.length;i++){
//		if(sonNode[i].nodeName == "li" || !/\s/.test(sonNode.nodeValue)){
//			liNode[0].removeChild(sonNode);
//		}
//	}
	alert(sonNode.length);
}

function hack(){
	alert("pne");
}

