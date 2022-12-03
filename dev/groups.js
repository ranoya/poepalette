groups = function (par) {

    let newarr = select(alldata, multipatterncheck_exclude, par);

    let xpto = `<div class="outputgrid">`;
            tipos = tags(newarr, "Group", ",");

            for (let i = 0; i < tipos.length; i++) {
                xpto += `<a href='javascript:setinput("${tipos[i]}")'>${tipos[i]}</a>`; 
            }
    
    xpto += `</div>`;

    present(xpto);
    

}