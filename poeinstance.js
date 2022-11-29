// Input History
let capturaentrada = "";
let matrizentradas = [""];
let matrizi = 1;
let matual = 1;

let datt = document.createElement("script");
datt.src = "https://poepalette.vercel.app/dev/datat.js"
document.head.appendChild(datt);

let createpoe = function (json, css, plugins) {

    let lnkcss = document.createElement("link");
    lnkcss.href = "https://poepalette.vercel.app/dev/instancestyle.css";
    lnkcss.type = "text/css";
    lnkcss.rel = "stylesheet";
    document.head.appendChild(lnkcss);
    
    if (typeof css != "undefined" || css != "" || css != null) {
        let customcss = document.createElement("link");
        customcss.href = css
        customcss.type = "text/css";
        customcss.rel = "stylesheet";
        document.head.appendChild(customcss);
    }

    let poeblock = document.createElement("div");
    poeblock.id = "poeinst";
    document.body.appendChild(poeinst);

    let customcmd = [];

    document.getElementById("poeinst").innerHTML = `
    <input id="entrada" type="text" autocomplete="false" />
    <div class="gridhead"><span class="separaline"></span></div>
    <div id="outputs"></div>`;

    if (
      typeof plugins != undefined &&
      plugins != "" &&
      plugins != null
    ) {
      fetch(plugins)
        .then((response) => response.json())
        .then((dados) => {
          console.table(dados);

          for (i = 0; i < dados.length; i++) {
            customcmd[i] = dados[i].instruction;

            let scrjs = document.createElement("script");
            scrjs.src = dados[i].js;
            document.head.appendChild(scrjs);
          }

        });
    }

    omnifilterfetchdata(json, "entrada");
}


    document.body.addEventListener("keyup", function (e) {
      clearTimeout(capturaentrada);
      // console.log(e.keyCode + " " + e.key);
      if (e.keyCode == 38) {
        if (matual > 0) {
          matual--;
        }
        setinput(matrizentradas[matual]);
        // console.log("matual: " + matual);
      } else if (e.keyCode == 40) {
        if (matual <= matrizentradas.length - 1) {
          matual++;
          setinput(matrizentradas[matual]);
          // console.log("matual: " + matual);
        }

        if (matual == matrizentradas.length) {
          setinput("");
        }
      } else {
        capturaentrada = setTimeout(listaentradas, 1000);
      }
    });



    // Processing data filters (this is the real deal!)

    let colecao = [];
    let categorias = [];

    omnifilter = function (oarr) {
      document.getElementById("outputs").style.overflow = "auto";
      colecao = tags(oarr, "Group", ",");
      categorias = tags(oarr, "Group", ",");

      if (
        document.getElementsByTagName("input")[0].value.toString().charAt(0) !=
          ">" &&
        document.getElementsByTagName("input")[0].value.toString().charAt(0) !=
          "@" &&
        document.getElementsByTagName("input")[0].value.toString().charAt(0) !=
          "/"
      ) {
        let code = `<div class="outputgrid">`;
        let arr = orderby(oarr, categorias, "Group");

        if (arr.length > 10) {
          for (let c = 0; c < colecao.length; c++) {
            code += `<span class='categoria'><a href='javascript:setinput("${colecao[c]}")' class='grouplink'>${colecao[c]}</a></span>`;

            for (let l = 0; l < arr.length; l++) {
              if (arr[l]["cat"] == colecao[c]) {
                if (arr[l]["Type"] == "self") {
                  code += `<a target='_self' href='${arr[l].Link}' class='linksrecursos'>${arr[l].Name}</a>`;
                } else if (arr[l]["Type"] == "embed") {
                  code += `<a target='_self' href='javascript:embed("${arr[l].Link}")' class='linksrecursos'>${arr[l].Name}</a>`;
                } else {
                  code += `<a target='_blank' href='${arr[l].Link}' class='linksrecursos'>${arr[l].Name}</a>`;
                }
              }
            }
          }
        } else {
          let ultimoregistro = "";
          code += `<span class='categoria'>`;

          for (let c = 0; c < colecao.length; c++) {
            code += `<a href='javascript:setinput("${colecao[c]}")' class='grouplink'>${colecao[c]}</a> • `;
          }

          code += `</span>`;

          for (let l = 0; l < arr.length; l++) {
            if (arr[l].Link != ultimoregistro) {
              if (arr[l]["Type"] == "self") {
                code += `<a target='_self' href='${arr[l].Link}' class='linksrecursos'>${arr[l].Name}</a>`;
              } else if (arr[l]["Type"] == "embed") {
                code += `<a target='_self' href='javascript:embed("${arr[l].Link}")' class='linksrecursos'>${arr[l].Name}</a>`;
              } else {
                code += `<a target='_blank' href='${arr[l].Link}' class='linksrecursos'>${arr[l].Name}</a>`;
              }

              ultimoregistro = arr[l].Link;
            }
          }
        }

        code += `<div>`;

        if (arr.length == 0) {
          code = "";
        }

        // TODO
        // CALCULATOR NOT WORKING PROPERLY
        if (
          document
            .getElementsByTagName("input")[0]
            .value.match(/^[0-9 \+\*\/\-\(\)\^\%\.]+[0-9\)]$/)
        ) {
          try {
            let potencia = document
              .getElementsByTagName("input")[0]
              .value.replace(/([0-9]+)(\^)([0-9]+)/gim, "Math.pow($1,$3)");
            let xpto = potencia.match(/.*/);
            code = `<div class="outputgrid">= ` + eval(xpto[0]) + `</div>`;
          } catch (error) {}
        }

        present(code);
      } else {
        let code = "";
        for (let i = 0; i < customcmd.length; i++) {
          if (
            document
              .getElementsByTagName("input")[0]
              .value.match("/" + customcmd[i])
          ) {
            let patt = new RegExp(customcmd[i] + "(.*)", "i");
            let extrai = document
              .getElementsByTagName("input")[0]
              .value.match(patt);

            if (
              typeof extrai[1] != "undefined" &&
              extrai[1] != null &&
              extrai[1] != ""
            ) {
              eval(customcmd[i] + "('" + extrai[1] + "')");
            }
          }
        }
      }
    };