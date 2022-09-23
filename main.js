document.querySelector('.control-buttons span').onclick = function () {
    let yourName = prompt('Whats Your Name');
    if (yourName == null || yourName == '') {
        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.name span').innerHTML = yourName;
    }
    document.querySelector('.control-buttons').remove();
}

let duration = 1000;
let blockscontainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blockscontainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', function () {
        flipBlock(block);
    })

})


function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    //collected all fliped bloks
    let allFlippedBlocks = blocks.filter(FlippedBlock => FlippedBlock.classList.contains('is-flipped'));

    //if tehre are two selected bloks
    if (allFlippedBlocks.length === 2) {

        stopclicking();

        checkMatch(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;

        //current array and swap and shoffling
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

//stop cliking function
function stopclicking() {
    blockscontainer.classList.add('no-clicking');
    setTimeout(() => {
        //remove class no clicking 
        blockscontainer.classList.remove('no-clicking');
    }, duration);
}

//mutch block fucntion
function checkMatch(firstBlock, secondBlocks) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlocks.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlocks.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlocks.classList.add('has-match');
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlocks.classList.remove('is-flipped');
        }, duration);
    }
}