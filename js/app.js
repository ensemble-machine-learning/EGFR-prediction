function reset() {

	document.getElementById('DL_Score').value = '';
	document.getElementById('Long-axis_diamater').value = '';
	document.querySelector('input[type="radio"][name="Texture"][value="0"]').checked = true;
	document.querySelector('input[type="radio"][name="Bubblelike_lucency"][value="0"]').checked = true;
	document.querySelector('input[type="radio"][name="Air_bronchogram"][value="0"]').checked = true;
	document.querySelector('input[type="radio"][name="Vascular_convergence"][value="0"]').checked = true;
	document.querySelector('input[type="radio"][name="Pleural_retraction"][value="0"]').checked = true;
	document.querySelector('input[type="radio"][name="Sex"][value="1"]').checked = true;
	document.querySelector('input[type="radio"][name="Smoke_history"][value="0"]').checked = true;
}
					
function predict() {
			
	let input = [];
	var Long = document.getElementById('Long-axis_diamater').value
	var DL = document.getElementById('DL_Score').value
	var texture = document.querySelector('input[type="radio"][name="Texture"]:checked').value;
	var Bubblelike_lucency = document.querySelector('input[type="radio"][name="Bubblelike_lucency"]:checked').value;
	var air = document.querySelector('input[type="radio"][name="Air_bronchogram"]:checked').value;
	var Vascular = document.querySelector('input[type="radio"][name="Vascular_convergence"]:checked').value;
	var Pleural = document.querySelector('input[type="radio"][name="Pleural_retraction"]:checked').value;
	var sex = document.querySelector('input[type="radio"][name="Sex"]:checked').value;
	var smoke = document.querySelector('input[type="radio"][name="Smoke_history"]:checked').value;
	
	// console.log(Long)
	// console.log(texture)
	// console.log(Bubblelike_lucency)
	// console.log(air)
	// console.log(Vascular)
	// console.log(Pleural)
	// console.log(sex)
	// console.log(smoke)
				
	if (DL.trim() != "" && parseFloat(DL) > 0 && parseFloat(DL) < 1) {
		if(Long.trim() != "" && parseFloat(Long) >= 1 && parseFloat(Long) <= 10){
			input.push(parseFloat(DL))
			input.push(parseFloat(Long))
			input.push(parseFloat(texture))
			input.push(parseFloat(Bubblelike_lucency))
			input.push(parseFloat(air))
			input.push(parseFloat(Vascular))
			input.push(parseFloat(Pleural))
			input.push(parseFloat(sex))
			input.push(parseFloat(smoke))
			fetch('https://a262bb6feblc.ngrok-free.app/predict', {
				method: 'POST',
				headers: {
			    	'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data: input })
			})
			.then(response => response.json())
			.then(data => {
			
				document.getElementById('prediction').textContent = data.prediction;
			})
			.catch(error => {
				console.error('error:', error);
			});
		} else {
			alert("Long-axis diameter input must be 1-10cm");
		}
	} else {
		alert("DL Score input must be 0-1");
	}
}
