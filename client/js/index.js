window.onload = ()=>{
    rabit = document.getElementsByClassName('rabit')[0];
    rabit.style.top = 400;
    setInterval(() => {
        
        JumpY += JumpAccelerationY;
        if(JumpY > 0)
            JumpAccelerationY--;
        else
        JumpY = 0
        rabit.style.top = rabitY - JumpY;

        VilocityX += AccelerationX;
        rabit.style.left = rabitX + VilocityX;


    }, 50);
    window.onkeydown = aKeyWasDown;
}


    var rabit ;
    var rabitX = 400;
    var rabitY = 400;
    var JumpY = 0;
    var JumpAccelerationY = 0;
    var AccelerationX = 0;
    var AccelerationY = 0;
    var VilocityX = 0;
    var VilocityY = 0; 

function aKeyWasDown(event) {
    let key = event.key;    
    let text
    switch(key)
    {
        case "ArrowUp":
            {
                                  
            }break;
        case "ArrowDown":
            {
                           
            }break;
        case "ArrowLeft":
            {
                if(AccelerationX > -5)
                    AccelerationX -=4;                  
            }break;
        case "ArrowRight":
            {
                if(AccelerationX < 5)
                AccelerationX +=4;
            }break;
        case " ":
            {
                if(JumpY == 0)
                    JumpAccelerationY = 7;                
            }break;
    }
    

  }
