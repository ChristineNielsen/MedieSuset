let stageColor = document.getElementsByClassName('card');
for(i=0; i<stageColor.length; i++){
    let stageName = stageColor[i].getAttribute('value');
    switch (stageName){
        case 'Rød scene':
            stageColor[i].style.backgroundColor = '#A33A49';
            break;
        case 'Blå scene':
            stageColor[i].style.backgroundColor = '#396999';
            break;
        case 'Grøn scene':
            stageColor[i].style.backgroundColor = '#6B8846';
            break;
        case 'Lilla scene':
            stageColor[i].style.backgroundColor = '#80347C';
            break;
    }
}