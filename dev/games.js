let games = function (par) {
        
        getcsvdata(GoogleSheetCsvURL(`https://docs.google.com/spreadsheets/d/1YdEW-JTZ9W3MB_gaJ2x5svEVs5gJXfb0d_QxkPL16d4/edit#gid=0`), function(dados) {

            let newarr = select(dados, multipatterncheck_exclude, par);
            let xpto = `<div class="outputgrid">`;

            for (let i = 0; i < newarr.length; i++) {
                xpto += `<a target='_blank' href='${newarr[i].link}'>${newarr[i].game}`; 
            }
    
            xpto += `</div>`;
            present(xpto);
        });
    
}
