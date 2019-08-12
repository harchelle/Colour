// creation of object for neural network
function createNetworkObject(r,g,b){
	let networkObject = {r:null, g:null, b:null};
	networkObject.r = r/255;
	networkObject.g = g/255;
	networkObject.b = b/255;

	return networkObject;
}
// Machine learning probability label - determining the result
function networkLabel(result){
	if(result.light > result.dark){
			result = 'light';
		} else {
			result = 'dark';
		}
	return result;
}

// Change background colour
function changeBackgroundColor(r,g,b){
	container.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// change colors on page relative to background
function changeElementsColor(result){
	let labelsToChange = document.getElementsByTagName('label');
	let slidersToChange = document.querySelectorAll('.colorPicker input');
	
	if (result == 'light'){
			for(let i = 0; i < slidersToChange.length; i++){
				slidersToChange[i].style.backgroundColor = 'black';
			}
			for(let i = 0; i < labelsToChange.length; i++){
				labelsToChange[i].style.color = 'black';
			}
		}
		else if (result == 'dark'){
			for(let i = 0; i < slidersToChange.length; i++){
				slidersToChange[i].style.backgroundColor = 'white';
			}
			for(let i = 0; i < labelsToChange.length; i++){
				labelsToChange[i].style.color = 'white';
			}
		}
}

//===============================================================================//

// create new neural network object
const network = new brain.NeuralNetwork();

// train algorithm with known data
network.train([
	{ input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
	{ input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
	{ input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
    { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
	{ input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
	{ input: {r: 1, g: 0.42, b: 0.52}, output: { dark: 1 } },
	{ input: {r: 0, g: 0, b: 1}, output: { dark: 1 } },
	{ input: {r: 0.8, g: 0.44, b: 1}, output: { dark: 1 } },
	{ input: {r: 0, g: 0.44, b: 1}, output: { dark: 1 } },
	{ input: {r: 0.3 , g: 0.6, b: 1}, output: { dark: 1 } },
	{ input: {r: 0.1, g: 0.6, b: 0}, output: { dark: 1 } }
]);

// grab inputs in .colorPicker div
let sliders = document.querySelectorAll('.colorPicker input');

// rgb slider
for(let i = 0; i < sliders.length; i++){
	sliders[i].addEventListener("input", function(){
        // on input event, grab slider input values
		let redSlider = document.getElementById("redSlider").value;
		let greenSlider = document.getElementById("greenSlider").value;
		let blueSlider = document.getElementById("blueSlider").value;
		
        // use ML to determine result
		let networkObject = createNetworkObject(redSlider, greenSlider, blueSlider);
		let MLresult = network.run(networkObject);
		
		//console.log(MLresult)
        MLresult = networkLabel(MLresult);
		
      
        document.getElementById("red").innerHTML = "R " + redSlider;
		document.getElementById("green").innerHTML = "G " + greenSlider;
		document.getElementById("blue").innerHTML = "B " + blueSlider;
        document.getElementById("MLresult").innerHTML = "Background detected as: " + MLresult;
        
        // change colours
        changeBackgroundColor(redSlider, greenSlider, blueSlider);
        changeElementsColor(MLresult);
		
	});
}
