let games = function (par) {
        
        fetch(`https://opensheet.elk.sh/1YdEW-JTZ9W3MB_gaJ2x5svEVs5gJXfb0d_QxkPL16d4/List`).then(response => response.json()).then((dados) => {

            let newarr = select(dados, multipatterncheck_exclude, par);
            let xpto = `<div class="outputgrid">`;

            for (let i = 0; i < newarr.length; i++) {
                xpto += `<a target='_blank' href='javascript:setinput("${newarr[i].link}")'>${newarr[i].game}`; 
            }
    
            xpto += `</div>`;
            present(xpto);
        });
    
}
