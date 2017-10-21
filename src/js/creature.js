const RUN_INTERVAL = 120;
const RUN_STEP_COUNT = 4;
const SIZE = 74;

const creatures = {
    knight: {
        el: null,
        runStep: 0,
        direction: 0,
        mirror: false,
        timer: null,
    }
};

const directions = {
    0: {
        direction: 0,
        mirror: false,
    },
    1: {
        direction: 0,
        mirror: false,
    },
    3: {
        direction: 4,
        mirror: false,
    },
    4: {
        direction: 2,
        mirror: false,
    },
    12: {
        direction: 2,
        mirror: true,
    },
    5: {
        direction: 1,
        mirror: false,
    },
    13: {
        direction: 1,
        mirror: true,
    },
    7: {
        direction: 3,
        mirror: false,
    },
    15: {
        direction: 3,
        mirror: true,
    },
};

let lastKeyDown = '';

document.addEventListener( 'DOMContentLoaded', e => {
    creatures.knight.el = document.querySelector( '.knight' );
    
});

document.addEventListener( 'keydown', e => {

    if (e.key === ' ') {
        return toggleRunning();
    }

    let code = keyToCode( e.key );
    if (!code) {
        return;
    }

    code |= keyToCode( lastKeyDown );
    const direction = directions[ code ];
    Object.assign( creatures.knight, direction );

    lastKeyDown = e.key;

    updateStep( 'knight' );
});

document.addEventListener( 'keyup', e => {
    lastKeyDown = '';
});

function nextStep( name ) {
    const creature = creatures[ name ];

    increaseRunStep( creature );
    updateStep( name );
}

function updateStep( name ) {
    const creature = creatures[ name ];
    const styles = [
        `background-position: -${creature.direction * SIZE}px -${creature.runStep * SIZE}px`,
        creature.mirror ? 'transform: scaleX(-1)' : '',
    ];
    creature.el.setAttribute( 'style', styles.filter( s => !!s ).join( ';' ) );
}

function increaseRunStep( creature ) {
    let step = creature.runStep + 1;
    if (step >= RUN_STEP_COUNT) {
        step = 0;
    }
    creature.runStep = step;
}

function keyToCode( key ) {
    if (key === 'ArrowUp') {
        return 1;
    }
    else if (key === 'ArrowDown') {
        return 3;
    }
    else if (key === 'ArrowRight') {
        return 4;
    }
    else if (key === 'ArrowLeft') {
        return 12;
    }
    return 0;
}

function toggleRunning() {
    if (!creatures.knight.timer) {
        creatures.knight.timer = setInterval( nextStep,  RUN_INTERVAL, 'knight' );
    }
    else {
        clearInterval( creatures.knight.timer );
        creatures.knight.timer = null;

        creatures.knight.runStep = 0;
        nextStep( 'knight' );
    }
}