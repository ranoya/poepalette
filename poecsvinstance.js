// Input History
let capturaentrada = "";
let matrizentradas = [""];
let matrizi = 1;
let matual = 1;
let customcmd = [];
let cloudfiles = [];

var keymapping = {}; // You could also use an array
onkeydown = onkeyup = function (e) {
  e = e || event;
  keymapping[e.keyCode] = e.type == "keydown";

  // ctrl+shift+p
  if (
    ((keymapping[93] || keymapping[91] || keymapping[92] || keymapping[17]) &&
      keymapping[80] &&
      keymapping[16]) ||
    ((keymapping[93] || keymapping[91] || keymapping[92] || keymapping[17]) &&
      keymapping[75]) ||
    (keymapping[16] && keymapping[92] && keymapping[79])
  ) {
    keymapping[93] = false;
    keymapping[92] = false;
    keymapping[91] = false;
    keymapping[75] = false;
    keymapping[79] = false;
    keymapping[80] = false;
    keymapping[16] = false;
    keymapping[17] = false;
    toggle("poeinst");
  }
};

const toggle = function (who) {
  if (
    document.getElementById(who).style.display == "none" ||
    document.getElementById(who).style.display == ""
  ) {
    document.getElementById(who).style.display = "block";
    keymapping[93] = false;
    keymapping[92] = false;
    keymapping[91] = false;
    keymapping[75] = false;
    keymapping[79] = false;
    keymapping[80] = false;
    keymapping[16] = false;
    keymapping[17] = false;

    document.getElementById("entrada").focus();

    // trata incidente

    if (
      document.getElementById("entrada").value == "o" ||
      document.getElementById("entrada").value == "O"
    ) {
      document.getElementById("entrada").value = "";
    }
  } else {
    document.getElementById(who).style.display = "none";
    keymapping[93] = false;
    keymapping[92] = false;
    keymapping[91] = false;
    keymapping[75] = false;
    keymapping[79] = false;
    keymapping[80] = false;
    keymapping[16] = false;
    keymapping[17] = false;

    // trata incidente

    if (
      document.getElementById("entrada").value == "o" ||
      document.getElementById("entrada").value == "O"
    ) {
      document.getElementById("entrada").value = "";
    }
  }
};

const startpoe = function (json, css, plugins, files) {
  if (typeof files == "undefined" || files == "" || files == null) {
    files = json;
  }

  getcsvdata(GoogleSheetCsvURL(files), function (dados) {
    cloudfiles = dados;
  });

  let lnkcss = document.createElement("link");
  lnkcss.href = "https://poepalette.vercel.app/dev/instancestyle.css";
  lnkcss.type = "text/css";
  lnkcss.rel = "stylesheet";
  document.head.appendChild(lnkcss);

  if (typeof css != "undefined" || css != "" || css != null) {
    let customcss = document.createElement("link");
    customcss.href = css;
    customcss.type = "text/css";
    customcss.rel = "stylesheet";
    document.head.appendChild(customcss);
  }

  if (typeof plugins != "undefined" && plugins != "" && plugins != null) {
    getcsvdata(GoogleSheetCsvURL(plugins), function (dados) {
      for (i = 0; i < dados.length; i++) {
        customcmd[i] = dados[i].instruction;

        let scrjs = document.createElement("script");
        scrjs.src = dados[i].js;
        document.head.appendChild(scrjs);
      }
    });
  }

  window.onload = createpoe(json);
};

const createpoe = function (json) {
  let poeblock = document.createElement("div");
  poeblock.id = "poeinst";
  document.body.appendChild(poeblock);

  document.getElementById("poeinst").innerHTML = `
    <input id="entrada" type="text" autocomplete="false" />
    <div class="gridhead"><span class="separaline"></span></div>
    <div id="outputs"></div>`;

  omnifilterfetchcsvdata(GoogleSheetCsvURL(json), "entrada");
};

/*
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
*/

// Processing data filters (this is the real deal!)

let colecao = [];
let categorias = [];

omnifilter = function (oarr) {
  document.getElementById("outputs").style.overflow = "auto";
  colecao = tags(oarr, "Group", ",");
  categorias = tags(oarr, "Group", ",");

  if (
    document.getElementById("entrada").value.toString().charAt(0) != ">" &&
    document.getElementById("entrada").value.toString().charAt(0) != "@" &&
    document.getElementById("entrada").value.toString().charAt(0) != "/"
  ) {
    let code = `<div class="outputgrid">`;
    let arr = orderby(oarr, categorias, "Group");

    if (arr.length > 10) {
      for (let c = 0; c < colecao.length; c++) {
        code += `<span class='categoria'><a href='javascript:setinput("&gt;${colecao[c]} ")' class='grouplink'>${colecao[c]}</a></span>`;

        for (let l = 0; l < arr.length; l++) {
          if (arr[l]["cat"] == colecao[c]) {
            if (arr[l]["Type"] == "self") {
              code += `<a target='_self' href='${arr[l].Link}' class='linksrecursos'>${arr[l].Name}</a>`;
            } else if (arr[l]["Type"] == "embed") {
              code += `<a target='_self' href='javascript:embed("${arr[l].Link}")' class='linksrecursos'>${arr[l].Name}</a>`;
            } else if (arr[l]["Type"] == "run") {
              code += `<a target='_self' href='${arr[l].Link}' class='linksrecursos'>${arr[l].Name}</a>`;
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
        code += `<a href='javascript:setinput("&gt;${colecao[c]} ")' class='grouplink'>${colecao[c]}</a> • `;
      }

      code += `</span>`;

      for (let l = 0; l < arr.length; l++) {
        if (arr[l].Link != ultimoregistro) {
          if (arr[l]["Type"] == "self") {
            code += `<a target='_self' href='${arr[l].Link}' class='linksrecursos'>${arr[l].Name}</a>`;
          } else if (arr[l]["Type"] == "embed") {
            code += `<a target='_self' href='javascript:embed("${arr[l].Link}")' class='linksrecursos'>${arr[l].Name}</a>`;
          } else if (arr[l]["Type"] == "run") {
            code += `<a target='_self' href='${arr[l].Link}' class='linksrecursos'>${arr[l].Name}</a>`;
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
        .getElementById("entrada")
        .value.match(/^[0-9 \+\*\/\-\(\)\^\%\.]+[0-9\)]$/)
    ) {
      try {
        let potencia = document
          .getElementById("entrada")
          .value.replace(/([0-9]+)(\^)([0-9]+)/gim, "Math.pow($1,$3)");
        let xpto = potencia.match(/.*/);
        code = `<div class="outputgrid">= ` + eval(xpto[0]) + `</div>`;
      } catch (error) {}
    }

    present(code);
  } else {
    let code = "";

    // In case of a / command
    if (document.getElementById("entrada").value.toString().charAt(0) == "/") {
      if (document.getElementById("entrada").value == "/") {
        code += `<div class="outputgrid">`;

        for (let i = 0; i < customcmd.length; i++) {
          code += `<a href='javascript:setinput("/${customcmd[i]} ")'>${customcmd[i]}</a>`;
        }

        code += `</div>`;
        present(code);
      }

      for (let i = 0; i < customcmd.length; i++) {
        if (
          document.getElementById("entrada").value.match("/" + customcmd[i])
        ) {
          let patt = new RegExp(customcmd[i] + "(.*)", "i");
          let extrai = document.getElementById("entrada").value.match(patt);

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

    // in case of a @ common cloud files search
    if (
      document.getElementById("entrada").value.toString().charAt(0) == "@" &&
      cloudfiles.length != 0
    ) {
      //first, extract the service
      let serv = document
        .getElementById("entrada")
        .value.match(/(\@(\w*)){0,1}/i);

      //look for matches in coudfiles
      let arr = [];
      if (typeof serv[2] == "undefined" || typeof serv[2] == null) {
        serv[2] = "";
      }
      arr = cfilter(cloudfiles, "Service", serv[2]);
      let howmanyservices = unique(arr, "Service");

      // in case of multiple services match
      if (howmanyservices.length > 1) {
        let myhtml = `<div class="outputgrid">`;
        for (let i = 0; i < howmanyservices.length; i++) {
          myhtml += `<a href='javascript:setinput("@${howmanyservices[i]} ")'>${howmanyservices[i]}</a>`;
        }

        myhtml += `</div>`;
        present(myhtml);
      }

      // in case of one service match
      if (howmanyservices.length == 1) {
        // extract parameter
        let param = document
          .getElementById("entrada")
          .value.match(/(\@(\w*) (.*)){0,1}/i);

        if (typeof param[3] == "undefined" || param[3] == null) {
          param[3] = "";
        }
        // buid array with matching parameter
        // this option is to match only with the Name
        //let narr = cfilter(cloudfiles, "Name", param[3]);

        // this option is to match with everything
        let narr = select(arr, multipatterncheck_exclude, param[3]);

        let myhtml = `<div class="outputgrid">`;
        for (let i = 0; i < narr.length; i++) {
          if (narr[i]["Type"] == "self") {
            myhtml += `<a target='_self' href='${narr[i].Link}' class='linksrecursos'>${narr[i].Name}</a>`;
          } else if (narr[i]["Type"] == "embed") {
            myhtml += `<a target='_self' href='javascript:embed("${narr[i].Link}")' class='linksrecursos'>${narr[i].Name}</a>`;
          } else {
            myhtml += `<a target='_blank' href='${narr[i].Link}' class='linksrecursos'>${narr[i].Name}</a>`;
          }
        }

        myhtml += `</div>`;
        present(myhtml);
      }
    }

    // in case of a > show only one group
    if (document.getElementById("entrada").value.toString().charAt(0) == ">") {
      //first, extract group
      let serv = document
        .getElementById("entrada")
        .value.match(/(\>(\w*)){0,1}/i);

      //look for matches in bookmarks
      let arr = [];
      if (typeof serv[2] == "undefined" || typeof serv[2] == null) {
        serv[2] = "";
      }

      arr = cfilter(alldata, "Group", serv[2]);
      let howmanygroupsdivide = tags(arr, "Group", ",");

      let howmanygroups = [];

      for (let k = 0; k < howmanygroupsdivide.length; k++) {
        let patt = new RegExp(serv[2], "i");
        if (howmanygroupsdivide[k].match(patt)) {
          howmanygroups.push(howmanygroupsdivide[k]);
        }
      }

      // in case of multiple groups match
      if (howmanygroups.length > 1) {
        let myhtml = `<div class="outputgrid">`;
        for (let i = 0; i < howmanygroups.length; i++) {
          myhtml += `<a href='javascript:setinput("&gt;${howmanygroups[i]} ")'>${howmanygroups[i]}</a>`;
        }

        myhtml += `</div>`;
        present(myhtml);
      }

      // in case of one group match
      if (howmanygroups.length == 1) {
        // extract parameter
        let param = document
          .getElementById("entrada")
          .value.match(/(\>(\w*) (.*)){0,1}/i);

        if (typeof param[3] == "undefined" || param[3] == null) {
          param[3] = "";
        }
        // buid array with matching parameter
        // this option is to match only with the Name

        // this option is to match with everything
        let narr = select(arr, multipatterncheck_exclude, param[3]);

        let myhtml = `<div class="outputgrid">`;
        for (let i = 0; i < narr.length; i++) {
          if (narr[i]["Type"] == "self") {
            myhtml += `<a target='_self' href='${narr[i].Link}' class='linksrecursos'>${narr[i].Name}</a>`;
          } else if (narr[i]["Type"] == "embed") {
            myhtml += `<a target='_self' href='javascript:embed("${narr[i].Link}")' class='linksrecursos'>${narr[i].Name}</a>`;
          } else {
            myhtml += `<a target='_blank' href='${narr[i].Link}' class='linksrecursos'>${narr[i].Name}</a>`;
          }
        }

        myhtml += `</div>`;
        present(myhtml);
      }
    }
  }
};

// DATAT Lib inside

// Change the input value

const setinput = function (n) {
  document.getElementById("entrada").value = n;
  document
    .getElementById("entrada")
    .dispatchEvent(new Event("input", { bubbles: true }));
  document.getElementById("entrada").focus();
};

const addinput = function (n) {
  let z = document.getElementById("entrada").value;
  document.getElementById("entrada").value = z.trim() + " " + n + " ";
  document
    .getElementById("entrada")
    .dispatchEvent(new Event("input", { bubbles: true }));
  document.getElementById("entrada").focus();
};

// Present results in Poe
const present = function (code) {
  document.getElementById("outputs").innerHTML = code;
};

const be = function (url) {
  window.location.href = url;
};

// Embed content
const embed = function (url) {
  document.getElementById("outputs").style.overflow = "hidden";
  let code = `<iframe frameborder=0 src='${url}'></iframe>`;
  present(code);
};

// FUNÇÃO URL GET
// let data = $_GET['xpto']; www.site.com/?xpto=teste

let $_GET = [];
(function () {
  corte = window.location.href.toString().indexOf("?");
  if (corte > 0) {
    argumento = window.location.href.toString().substring(corte + 1);
    argumentos = argumento.split("&");
    for (arg in argumentos) {
      let argCorte = argumentos[arg].indexOf("=");
      $_GET[argumentos[arg].substring(0, argCorte)] = argumentos[arg].substring(
        argCorte + 1
      );
    }
  }
})();

// Order By...

const orderby = function (arr, lista, crit) {
  let mynewarr = [];
  let myregex = new RegExp();
  let listacrit = 0;
  let nomecrit = [];
  let posicao = 0;

  for (let a = 0; a < arr.length; a++) {
    listacrit = 0;
    nomecrit = [];
    for (let l = 0; l < lista.length; l++) {
      myregex = new RegExp(lista[l]);
      if (myregex.test(arr[a][crit])) {
        nomecrit[listacrit] = lista[l];
        listacrit++;
      }
    }

    for (let lc = 0; lc < listacrit; lc++) {
      mynewarr[posicao] = {};
      mynewarr[posicao].Name = arr[a].Name;
      mynewarr[posicao].Link = arr[a].Link;
      mynewarr[posicao].Type = arr[a].Type;
      mynewarr[posicao].cat = nomecrit[lc];
      posicao++;
    }
  }

  return mynewarr;
};

const orderbytemplate = function (arr, lista, crit, keys) {
  let mynewarr = [];
  let myregex = new RegExp();
  let listacrit = 0;
  let nomecrit = [];
  let posicao = 0;

  for (let a = 0; a < arr.length; a++) {
    listacrit = 0;
    nomecrit = [];
    for (let l = 0; l < lista.length; l++) {
      myregex = new RegExp(lista[l]);
      if (myregex.test(arr[a][crit])) {
        nomecrit[listacrit] = lista[l];
        listacrit++;
      }
    }

    for (let lc = 0; lc < listacrit; lc++) {
      mynewarr[posicao] = {};
      mynewarr[posicao][keys[0]] = arr[a][keys[0]];
      mynewarr[posicao][keys[2]] = arr[a][keys[2]];
      mynewarr[posicao][keys[3]] = arr[a][keys[3]];
      mynewarr[posicao][keys[1]] = nomecrit[lc];
      posicao++;
    }
  }

  return mynewarr;
};

/**
 * DataT: small tools for data operations
 * Guilherme Ranoya, 2021
 *
 * BASIC FUNCTIONS
 *
 */

/**
 * Get Data Function
 *
 * Fetch JSON data and call a function to action over
 * the new data
 *
 * Ex:
 *
 * function xpto(d) {
 *    console.table(d);
 * }
 *
 * getdata(myurl,xpto);
 *
 */

const getdata = function (arquivojson, callback) {
  fetch(arquivojson)
    .then((response) => response.json())
    .then((dados) => {
      callback(dados);
    });
};

const getcsvdata = function (csvurl, callback) {
  fetch(csvurl)
    .then((response) => response.text())
    .then((dados) => {
      let total = omnifdados.length;
      let changecsv = "";
      let quantquotes = 0;
      for (let r = 0; r < total; r++) {
        if (omnifdados.substring(r, r + 1) == '"') {
          quantquotes++;
        }

        if (omnifdados.substring(r, r + 1) == "\n" && quantquotes % 2 != 0) {
          changecsv =
            omnifdados.substring(0, r) + " " + omnifdados.substring(r + 1);
          omnifdados = changecsv;
        }
      }

      let linhas = dados.split(/\r?\n|\r|\n/g);
      let linhadados = "";
      let valorfinal = "";
      let temp1 = "";
      let temp2 = "";

      let heads = linhas[0].split(",");

      let arr = [];

      for (let i = 1; i < linhas.length; i++) {
        arr[i - 1] = {};
        linhadados = linhas[i].split(
          /[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/
        );

        for (let k = 0; k < linhadados.length; k++) {
          linhadados[k].trim();

          if (linhadados[k].substring(0, 1) == '"') {
            temp1 = linhadados[k].substring(1, linhadados[k].length);
          } else {
            temp1 = linhadados[k];
          }

          if (temp1.substring(temp1.length - 2, temp1.length) == '"') {
            temp1 = temp1.substring(0, temp1.length - 2);
          }

          if (temp1.substring(temp1.length - 1, temp1.length) == '"') {
            temp2 = temp1.substring(0, temp1.length - 1);
          } else {
            temp2 = temp1;
          }

          valorfinal = temp2.replace(/""/g, '"');

          arr[i - 1][heads[k]] = valorfinal;
        }
      }

      callback(arr);
    });
};

/**
 * Get images from any kind of url
 * (under improvement)
 *
 * Return the url for an image.
 * If it is already an imagem, return the url;
 * If it is a video, return the url from the thumnail.
 *
 * Ex:
 *
 * let photo = imagefromallsources('https://www.youtube.com/watch?v=ZbFATmGhz9k');
 *
 */

const imagefromallsources = function (murl) {
  let video = "";
  let nurl = murl.replace(/\&amp;/gi, "&");

  video = nurl.match(
    /(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  );

  if (typeof video != "undefined" && video != null) {
    return "https://img.youtube.com/vi/" + video[6] + "/0.jpg";
  } else if (nurl.match(/\.png|\.svg|\.jpg|\.gif|.webp/i)) {
    return nurl;
  } else {
    return nurl;
  }
};

/**
 *
 * Get a JSON from a Google Sheet using opensheet.elk.sh
 *
 * Example:
 * let mydata = googlesheet('https://docs.google.com/spreadsheets/d/1qXCwwsiNdZnqlvNzLxol-ZGRTEH7fQfRsK2SWpNIuM4/edit#gid=1417963869', 'Biblioteca');
 *
 *
 */

const googlesheet = function (url, aba) {
  let arquivo = url.match(/spreadsheets\/d\/(.*)\/edit/i);
  return `https://opensheet.elk.sh/${arquivo[1]}/${aba}`;
};

const GoogleSheetCsvURL = function (url) {
  url = new URL(url);
  const id = url.pathname.split("/")[3];
  const gid = new URLSearchParams(url.hash.slice(1)).get("gid") || 0;
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
};

/**
 * Boolean Filter
 * Create a list array from an old one when their elements have any value on a specific criteria(key)
 *
 * Ex:
 *
 * separate = bfilter(oldarray, "active");
 *
 */

const bfilter = function (arr, crit) {
  let newarr = [];
  let c = 0;
  for (let k = 0; k < arr.length; k++) {
    if (arr[k][crit] != "" && arr[k][crit] != "undefined") {
      newarr[c] = {};
      newarr[c] = arr[k];
      c++;
    }
  }
  return newarr;
};

/**
 * Filter Condition
 * Create a list array from an old one when their elements have a specific value match on a specific criteria(key)
 *
 * Ex:
 *
 * separate = cfilter(oldarray, "status", "(.*)ok");
 *
 */

const cfilter = function (arr, crit, regex) {
  let newarr = [];

  let patt = new RegExp(regex, "i");

  let c = 0;
  for (let k = 0; k < arr.length; k++) {
    if (
      arr[k][crit] != "" &&
      arr[k][crit] != "undefined" &&
      patt.test(arr[k][crit])
    ) {
      newarr[c] = {};
      newarr[c] = arr[k];
      c++;
    }
  }
  return newarr;
};

/**
 * Unique Function
 * Create a list array from unique values stored in a specific array field
 *
 * Ex:
 *
 * categories = unique(oldarray, "taxonomy") {
 *
 */

const unique = function (arr, crit) {
  let newarr = [];

  for (let i = 0; i < arr.length; i++) {
    newarr[arr[i][crit]] = 0;
  }

  let list = [];

  for (let key in newarr) {
    list.push(key);
  }

  return list;
};

/**
 * Sort by a list of values
 * Sort an array using a list of possible values for a specific key
 *
 * Ex:
 *
 * newarray = sortbylist(oldarray, keyvaluesarray, key);
 *
 * Use:
 *
 * disordered = [
 *               {'fruit': 'orange', 'quantity': 5, 'type': 'B'},
 *               {'fruit': 'apple', 'quantity': 2, 'type': 'A'},
 *               {'fruit': 'banana', 'quantity': 3, 'type': 'B'},
 *               {'fruit': 'apple', 'quantity': 10, 'type':'B'},
 *               {'fruit': 'strawberry', 'quantity': 5, 'type': 'A'}
 *              ];
 *
 * list = ['strawberry', 'apple'];
 *
 * orders = sortbylist(disordered, list, 'fruit'); // Array(3):
 *                                                 // [
 *                                                 //  {'fruit': 'strawberry', 'quantity': 5, 'type': 'A'},
 *                                                 //  {'fruit': 'apple', 'quantity': 2, 'type': 'A'},
 *                                                 //  {'fruit': 'apple', 'quantity': 10, 'type':'B'}
 *                                                 // ]
 *
 */

const sortbylist = function (arr, list, crit) {
  let newarr = [];

  for (let l = 0; l < list.length; l++) {
    for (let a = 0; a < arr.length; a++) {
      if (arr[a][crit] == list[l]) {
        newarr.push(arr[a]);
      }
    }
  }

  return newarr;
};

/**
 * Extract all Tags
 * Extract all Tags(words marking some criteria) in an array of objects,
 * in a specific key of the object
 *
 * Ex:
 *
 * newarray = tags(array, key, separator);
 *
 * Use:
 *
 * alltags = tags(myarray, "categories", ",");
 *
 */

const tags = function (arr, crit, separator) {
  let narr = [];
  let expl = [];

  for (let p = 0; p < arr.length; p++) {
    expl = [];
    expl = arr[p][crit].split(separator);

    for (let z = 0; z < expl.length; z++) {
      narr.push(expl[z].trim());
    }
  }

  let newarr = [];

  for (let i = 0; i < narr.length; i++) {
    newarr[narr[i]] = 0;
  }

  let list = [];

  for (let key in newarr) {
    list.push(key);
  }

  return list;
};

/**
 * Shuffle Function
 * Create a list of numbers without repetition, for
 * random ordering itens of a list
 *
 * Ex:
 * neworderarray = shuffle(maxvalue, listsize);
 *
 * Use:
 *
 * order = suffle(myarray.length, 10);
 *
 */

const shuffle = function (maxvalue, listsize) {
  let lista = [];
  let c = 0;
  let r = false;
  let n = 0;

  while (c < listsize) {
    n = parseInt(Math.random() * maxvalue);

    r = false;
    for (let i = 0; i < lista.length; i++) {
      if (n == lista[i]) {
        r = true;
      }
    }

    if (!r) {
      lista[lista.length] = n;
      c++;
    }
  }

  return lista;
};

/**
 * Select Function
 * Select data from an Array using a function and a data colection
 * (if specified)
 *
 *
 * Ex:
 *
 * newarray = select(oldarray, function (n, arr, patt) {
 *
 *  if(patt.test(arr.valr)) {
 *
 *    n.push(arr);
 *
 *  }
 *
 * }, /mypattern/i);
 *
 */

const select = function (arr, fun, arr2) {
  let newarr = [];

  for (let i = 0; i < arr.length; i++) {
    fun(newarr, arr[i], arr2);
  }

  return newarr;
};

/**
 * SELECT TOOLS
 *
 */

/**
 * Simple Pattern Check
 *
 * Ex:
 *
 * newarray = select(oldarray, patterncheck, /mypattern/i);
 *
 */

const patterncheck = function (n, arr, patt) {
  let mark = false;

  for (let k = 0; k < Object.keys(arr).length; k++) {
    if (patt.test(arr[Object.keys(arr)[k]])) {
      mark = true;
    }
  }

  if (mark) {
    n.push(arr);
  }
};

/**
 * Additive multipattern check
 * Include any finding of any patterns separated by space
 *
 * Ex:
 *
 * newarray = select(oldarray, multipatterncheck_add, "slide presentation document");
 *
 */

const multipatterncheck_add = function (n, arr, patt) {
  if (patt != "" || typeof patt != "undefined") {
    let mark = false;
    let multipatt = patt.split(" ");
    let regextrans = "";

    for (let m = 0; m < multipatt.length; m++) {
      for (let k = 0; k < Object.keys(arr).length; k++) {
        regextrans = new RegExp(multipatt[m], "i");
        if (regextrans.test(arr[Object.keys(arr)[k]])) {
          mark = true;
        }
      }
    }

    if (mark) {
      n.push(arr);
    }
  } else {
    n.push(arr);
  }
};

/**
 * Exclusion multipattern check
 * Include findings when all patterns separated by space are present
 *
 * Ex:
 *
 * newarray = select(oldarray, multipatterncheck_exclude, "slide class");
 *
 */

const multipatterncheck_exclude = function (n, arr, patt) {
  if (patt != "" || typeof patt != "undefined") {
    let multipatt = patt.split(" ");
    let regextrans = "";
    let allcheck = [];
    let mark = true;

    for (let i = 0; i < multipatt.length; i++) {
      allcheck[multipatt[i]] = false;
    }

    for (let k = 0; k < Object.keys(arr).length; k++) {
      for (let m = 0; m < multipatt.length; m++) {
        regextrans = new RegExp(multipatt[m], "i");
        if (regextrans.test(arr[Object.keys(arr)[k]])) {
          allcheck[multipatt[m]] = true;
        }
      }
    }

    for (let i = 0; i < multipatt.length; i++) {
      if (allcheck[multipatt[i]] == false) {
        mark = false;
      }
    }

    if (mark) {
      n.push(arr);
    }
  } else {
    n.push(arr);
  }
};

/**
 *  OMNIFILTER
 *
 *  I 'm used to work with Observable (https://www.observablehq.com), and
 *  it 's Inputs.search function is a killer solution for filtering data.
 *
 *  This is an implementation of something like Observable 's Inputs.search
 *
 *  You will need:
 *
 *  a <input> element in your HTML;
 *  to create an omnifilter(arr) function, which will update
 *  everything in your document with data filtered by what
 *  is in the <input> element;
 *  a JSON file in an URL.
 *
 *  arr is the array created/updated from the JSON file being
 *  filtered by <input>
 *
 *  Ex:
 *
 *  omnifilter = function (arr) {
 *    console.table(arr);
 *  }
 *
 *  omnifilterfetchdata("https://www.myurl/file.json", "inputelementID");
 *
 */

let alldata = [];
let omnifdados = [];
let omnifilterfetchdata = function (arquivojson, el_id) {
  // Fetch JSON file
  fetch(arquivojson)
    .then((response) => response.json())
    .then((omnifdados) => {
      //Start Omnifilter Event Listener Function
      alldata = omnifdados;
      startomnifilter(omnifdados, el_id, omnifilter);
    });
};

// Omnifilter Event Listener Function
let startomnifilter = function (omnifdados, elemento, funcprocessa) {
  // console.log("Omnifilter: fetch finished");
  // console.table(omnifdados);

  /**
   *  Add a Listener Funcion filtering JSON data with
   *  DataT Select and Patterncheck, and running the
   *  update of anything insider Omnifilter Function
   */
  document.getElementById(elemento).addEventListener("input", function (evt) {
    let newomniarray = select(
      omnifdados,
      multipatterncheck_exclude,
      this.value
    );
    funcprocessa(newomniarray);
  });

  // console.log("Omnifilter: filtering event listener started");

  let newomniarray = select(omnifdados, multipatterncheck_exclude, "");
  funcprocessa(newomniarray);
};

let omnifilterfetchcsvdata = function (csvurl, el_id) {
  // Fetch CSV file
  fetch(csvurl)
    .then((response) => response.text())
    .then((omnifdados) => {
      let total = omnifdados.length;
      let changecsv = "";
      let quantquotes = 0;
      for (let r = 0; r < total; r++) {
        if (omnifdados.substring(r, r + 1) == '"') {
          quantquotes++;
        }

        if (omnifdados.substring(r, r + 1) == "\n" && quantquotes % 2 != 0) {
          changecsv =
            omnifdados.substring(0, r) + " " + omnifdados.substring(r + 1);
          omnifdados = changecsv;
        }
      }

      let linhas = omnifdados.split(/\r?\n|\r|\n/g);
      let linhadados = "";
      let valorfinal = "";
      let temp1 = "";
      let temp2 = "";

      let heads = linhas[0].split(",");

      let arr = [];

      for (let i = 1; i < linhas.length; i++) {
        arr[i - 1] = {};
        linhadados = linhas[i].split(
          /[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/
        );

        for (let k = 0; k < linhadados.length; k++) {
          linhadados[k].trim();

          if (linhadados[k].substring(0, 1) == '"') {
            temp1 = linhadados[k].substring(1, linhadados[k].length);
          } else {
            temp1 = linhadados[k];
          }

          if (temp1.substring(temp1.length - 2, temp1.length) == '"') {
            temp1 = temp1.substring(0, temp1.length - 2);
          }

          if (temp1.substring(temp1.length - 1, temp1.length) == '"') {
            temp2 = temp1.substring(0, temp1.length - 1);
          } else {
            temp2 = temp1;
          }

          valorfinal = temp2.replace(/""/g, '"');

          arr[i - 1][heads[k]] = valorfinal;
        }
      }

      alldata = arr;
      startomnifilter(arr, el_id, omnifilter);
    });
};
