window.onload = ()=>{
    fetch('/home/getstate')
    .then(res=>res.json())
    .then(res=>{
        serverState = res;
        localStorage["serverState"] = res;
    });
    mainStyleButton.onclick = mainStyleButtonClick;
}

function mainStyleButtonClick()
{
    if(serverState.windowStyle == 1)
        serverState.windowStyle = 2;
    else        
        serverState.windowStyle = 1;
    mainStyle.href = serverState.windowStyles[serverState.windowStyle];

    fetch('/home/changemainstyle?change=true')
    .then(res=>res.json())
    .then(res=>{
        serverState = res;
        localStorage["serverState"] = res;  
    });
}